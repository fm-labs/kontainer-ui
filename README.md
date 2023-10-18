# docker-http-client

Web frontend for docker-http server. Built with React and Vite.

## Quick Start

    


## Start locally in developer mode

    $ yarn install
    $ yarn dev


## Docker

### Build

```bash
docker build . -t docker-http-client
```


### Run

```bash
docker run \
  --rm \
  --publish 5080:80 \
  docker-http-client
```


## Tauri desktop app

### Launch

    $ yarn tauri dev
