FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

RUN npm test

CMD [ "npm", "start" ]