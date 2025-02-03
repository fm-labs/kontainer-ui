#!/bin/bash

docker run \
  --rm \
  --publish 5080:80 \
  kstack-ui

