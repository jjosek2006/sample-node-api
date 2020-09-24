#!/usr/bin/env bash

docker build --network=host -t localhost:5000/zowe-build:latest -t localhost:5000/zowe-build:"$(cat VERSION)" .

docker push localhost:5000/zowe-build:latest
docker push localhost:5000/zowe-build:"$(cat VERSION)"
