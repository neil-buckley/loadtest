## to run env against test

`./run-load-test.sh [.envfile] [test] (optional [token])`

[.envfile] expected to contain:
HASURA_GRAPHQL_ADMIN_SECRET=xxxx
HASURA_GRAPHQL_ENDPOINT=xxxx

[test]
Matches a scenario key.

Test queries and variables live in ./scripts/scenarios.test.js

e.g.
`./run-load-test.sh ./.env.development person`

`./run-load-test.sh ./.env.staging simpleQuery eyJhbGciOiJSUzI1NiIsImtpZCI6InJ4QndwUV9fWjcxeEhqQnlQRl85VHpkdjNkZ3RrQldlZHQ3b2ZIdnpqaUUifQ.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXVzZXItaWQiOiJmNTZiMWNiOC0wMWU0LTQwMTItYjlhYy0zNWI5ZWFkZmFkNTciLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInBhdGllbnQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoicGF0aWVudCIsIngtaGFzdXJhLXZheGlvbS11c2VyLWlkIjoibnVsbCIsIngtaGFzdXJhLXZheGlvbS1wZXJzb24taWQiOiIxNDUyMTM3MTAzNjIifSwiaWF0IjoxNjIxNDI4NDI5LCJleHAiOjE2MjE0MjkzMjl9.MCc9Jdnf1bI5whphTS57uI1Vfl-4IJeKuYSMzV4mbTCkGdomes49dAYF_jZ0zeo-1EA7gLKkhyKYEEokZrL3eOn7jSw4Kn8ilF-qc7uTiR9ftPe0vOur-v4zpv7kGZPp4dPg0sNHxlouAA3LNQhuObN1WlDW4ZZouPUstFkS02rwGQiJBmb4s1nNu7k1CnwXZY29NuTLwZpHCT7LKKgnKAbMkTZUvydtOyX6UiwAU1E48ubxdjT3MPF0UTENHA_gAgxnfNwaB7E2GDgtN0e3asVHXbS1kyMy_yeazGpHVyz_92r3SKW2xdmJfD0S9i6kgs09-4PgviI4WqgBCLbfXaafa05fWJs7KvXiWGkVlf-xTFXD9wVZPGXsZsvHZ4kYbiyquVGyKOWPT607rSNXnH6RQrUpHhNTv5KGuBxb1MpG3uMYJ2oQ40LOUBUYNdLUQugCbmodzeUtlByWc_MBVqyCgHHqkdxX7ZdEObuuwqPSi3vSn1mf8-hf7EPmnQmBrqPLtKH_zXt7Ni9jnFq-7nQ2KTYMBDalVQE9sFf2S2Nm44rHTVFiBwrF-f51WJN2AeR8Nld1ttksoDa5riycyCRcPiOsvSnWo-DFoty45zVq8Y9ONhc9SsRIa_b37edqfq8kgM1ahHCPabo8So3uY2SxIJaXvpKSSGzvHUde2_4`

#### View Output

To view got to: http://localhost:3007/d/k6/k6-load-testing-results

# Original Readme.

# docker-k6-grafana-influxdb

Demonstrates how to run load tests with containerised instances of K6, Grafana and InfluxDB.

#### Article

This is the accompanying source code for the following article. Please read for a detailed breakdown of the code and how K6, Grafana and InfluxDB work together using Docker Compose:

https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3

#### Dashboards

The dashboard in /dashboards is adapted from the excellent K6 / Grafana dashboard here:
https://grafana.com/grafana/dashboards/2587

There are only two small modifications:

- the data source is configured to use the docker created InfluxDB data source
- the time period is set to now-15m, which I feel is a better view for most tests

#### Scripts

The script here is an example of a low Virtual User (VU) load test of the excellent Star Wars API:
https://swapi.dev/

If you're tinkering with the script, it is just a friendly open source API, be gentle!
