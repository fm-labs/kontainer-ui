## Build stage
FROM node:lts AS build-stage

WORKDIR /app

# Copy package.json and yarn.lock for caching purposes
COPY package.json yarn.lock ./

# Install packages and cache them
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy rest of files
# See / edit .dockerignore file for excluded files
COPY . .

RUN yarn build

## Runtime stage
FROM nginx:alpine AS runtime-stage

WORKDIR /app

# Copy nginx configuration
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy from the builder stage
COPY --from=build-stage /app/dist /var/www/html/

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
