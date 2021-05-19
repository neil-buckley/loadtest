#!/bin/bash

docker compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard http://localhost:3007/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
ENV_FILE=$1 docker compose run k6 run -e TEST=$2 -e TOKEN=$3 -e VARIABLES=$4 /scripts/run.js
