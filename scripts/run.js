import http from 'k6/http'
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

export default function () {
  const response = http.post(
    url,
    JSON.stringify({
      query: scenarios[__ENV.TEST].query,
      variables: scenarios[__ENV.TEST].variables,
    }),
    { headers: headers }
  )
  check(response, { 'status is 200': r => r.status === 200 })
  sleep(0.3)
}
