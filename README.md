# kstack-ui

Web frontend for kstack-agent server. Built with React and Vite.

## Quick Start

    


## Start locally in developer mode

    $ yarn install
    $ yarn dev


## Docker

### Build

```bash
docker build . -t kstack-ui
```


### Run

```bash
docker run \
  --rm \
  --publish 5080:80 \
  kstack-ui
```


## Tauri desktop app

### Launch

    $ yarn tauri dev
