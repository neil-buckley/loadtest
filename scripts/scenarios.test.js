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
}

export { scenarios }
