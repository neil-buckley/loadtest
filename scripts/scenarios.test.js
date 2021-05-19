let scenarios = {
  person: {
    query: `query person($person_id: numeric!) {
              person: vaxiom_persons_by_pk(id: $person_id) {
                id
                first_name
                last_name
                primary_location_id
              }
            }`,
    variables: { person_id: 145213710362 },
  },
  querySimple: {
    query: `query app__App_Account_Content_Diagnostics_Analyze {
              vaxiom_persons(limit: 1) {
                id
                first_name
                last_name
              }
            }`,
    variables: {},
    headers: {
      'x-hasura-vaxiom-person-id': 145213710362,
      'x-hasura-role': 'patient',
    },
  },
}

export { scenarios }
