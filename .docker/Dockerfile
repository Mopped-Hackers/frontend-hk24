FROM node:20-alpine AS development

WORKDIR /var/www/html
COPY package*.json ./
RUN npm install
COPY . .
# TODO - setup development with docker


FROM node:20-alpine AS build-step
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ENV VITE_DOCKER true

RUN npm run build


FROM nginx:alpine AS production

WORKDIR /var/www/html

RUN apk update && apk add bash

COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build/dist /var/www/html

COPY ./.docker/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh