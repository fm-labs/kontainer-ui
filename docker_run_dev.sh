#!/bin/bash

docker build -t kontainer-ui:dev -f ./Dockerfile --progress=plain . && \

docker run -it --rm \
  --name kontainer-ui-dev \
  -p 3080:80 \
  kontainer-ui:dev $@
