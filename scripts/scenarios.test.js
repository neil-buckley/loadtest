let gql = s => s[0]

let scenarios = {
  person: {
    query: gql`
      query person($person_id: numeric!) {
        person: vaxiom_persons_by_pk(id: $person_id) {
          id
          first_name
          last_name
          primary_location_id
        }
      }
    `,
    variables: { person_id: 145213710362 },
  },
  querySimple: {
    query: gql`
      query app__App_Account_Content_Diagnostics_Analyze {
        vaxiom_persons(limit: 1) {
          id
          first_name
          last_name
        }
      }
    `,
    variables: {},
    headers: {
      'x-hasura-vaxiom-person-id': 145213710362,
      'x-hasura-role': 'patient',
    },
  },
  subscriptionComplex: {
    query: gql`
      subscription diagnostics_subscriptionComplex {
        comms_threads(limit: 5) {
          id
          events(order_by: { updated_at: asc }) {
            id
            thread_id
            type
            created_at
            sms {
              id
              message
              is_inbound
              twilio_message_status
              vaxiom_person_outbound {
                id
                person {
                  id
                  first_name
                  last_name
                }
              }
              mobile_number_inbound {
                id
              }
              mobile_number_outbound {
                id
                name
                number
              }
            }
            status {
              id
              name
              user {
                id
                first_name
                last_name
              }
            }
          }
        }
      }
    `,
    variables: {},
    headers: {},
  },
}

export { scenarios }
