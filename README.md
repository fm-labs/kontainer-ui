# kstack-ui

Web frontend for kstack-agent server. Built with React and Vite.

## Available commands


### `yarn install`

Install dependencies.


### `yarn dev`

Start the development server.


### `yarn lint`

Check for linting errors.

Use `yarn lint:fix` to fix linting errors.
Use `yarn lint:dump` to dump all linting errors to eslint-report.xml


### `yarn build`

Build the project for production.


### `yarn docker:build`

Build the Docker image.

```bash
docker build . -t kstack-ui
```

Run the Docker container locally.


### `yarn docker:run`

```bash
docker run \
  --rm \
  --publish 5080:80 \
  kstack-ui
```


### `yarn tauri dev`

Start the Tauri development server.
