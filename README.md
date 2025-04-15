# kontainer-ui

Web UI for [kontainer-core](https://github.com/fm-labs/kontainer-core). 
Built with React, Typescript, and Vite.

## Available commands


### `yarn install`

Install dependencies.

### `yarn run dev`

Start the development server.


### `yarn run lint`

Check for linting errors.

Use `yarn lint:fix` to fix linting errors.
Use `yarn lint:dump` to dump all linting errors to eslint-report.xml


### `yarn build`

Build the project for production.


### `yarn run docker:build`

Build the Docker image.

```bash
docker build . -t kontainer-ui
```

Run the Docker container locally.


### `yarn run docker:run`

```bash
docker run \
  --rm \
  --publish 5080:80 \
  kontainer-ui
```
