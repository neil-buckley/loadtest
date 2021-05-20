import http from 'k6/http'
import ws from 'k6/ws'
import { check, sleep } from 'k6'
import { scenarios } from './scenarios.test.js'

let url = __ENV.HASURA_GRAPHQL_ENDPOINT.replace(
  'localhost',
  'host.docker.internal'
)

let headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': __ENV.HASURA_GRAPHQL_ADMIN_SECRET,
}

export let options = {
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: '5s', target: 5 },

    // Stay at rest on 5 VUs for 10s
    { duration: '10s', target: 5 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: '5s', target: 0 },
  ],
}

let finalHeaders =
  (scenarios[__ENV.TEST].headers &&
    Object.assign({}, scenarios[__ENV.TEST].headers, headers)) ||
  headers

export default function () {
  // query
  if (scenarios[__ENV.TEST].query.startsWith('query ')) {
    const response = http.post(
      url,
      JSON.stringify({
        query: scenarios[__ENV.TEST].query,
        variables: scenarios[__ENV.TEST].variables,
      }),
      {
        headers: Object.assign({}, finalHeaders, {
          Authorization: __ENV.TOKEN ? `Bearer ${__ENV.TOKEN}` : {},
        }),
      }
    )

    if (response.status === 200) {
      console.log(`Response: ${JSON.stringify(response.body)}`)
    }

    check(response, { 'status is 200': r => r.status === 200 })
  } else {
    //subscription
    url = url.replace(/^(https?)/, 'ws')
    finalHeaders = Object.assign({}, finalHeaders, {
      'Sec-WebSocket-Protocol': 'graphql-ws',
    })

    const response = ws.connect(
      url,
      {
        headers: Object.assign({}, finalHeaders, {
          Authorization: __ENV.TOKEN ? `Bearer ${__ENV.TOKEN}` : {},
        }),
      },
      socket => {
        socket.on('message', msg => {
          const message = JSON.parse(msg)
          if (message.type == 'connection_ack')
            console.log('Connection Established with WebSocket')
          if (message.type == 'data')
            console.log(`Message Received: ${message}`)
        })
        socket.on('open', () => {
          socket.send(
            JSON.stringify({
              type: 'connection_init',
              payload: headers,
            })
          )
          socket.send(
            JSON.stringify({
              type: 'start',
              payload: {
                query: scenarios[__ENV.TEST].query,
                variables: scenarios[__ENV.TEST].variables,
              },
            })
          )
        })
      }
    )

    check(response, { 'status is 101': r => r && r.status === 101 })
  }

  sleep(0.3)
}
