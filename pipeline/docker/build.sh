#!/usr/bin/env bash
if [ -z "$1" ]; then
    echo "Usage: build.sh version"
    exit 1
fi

docker build --network=host  -t localhost:5000/test/zowe-build:"$1" .

docker push localhost:5000/test/zowe-build:"$1"
