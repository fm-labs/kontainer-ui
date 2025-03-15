#!/bin/bash

docker build -t kstack-ui:dev -f ./Dockerfile --progress=plain . && \

docker run -it --rm \
  --name kstack-ui-dev \
  -p 3080:80 \
  kstack-ui:dev $@
