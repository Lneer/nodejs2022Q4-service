# FROM node:18.14-alpine3.16
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 8080
# CMD ["npm","run","start:dev"]

FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=development

COPY . .