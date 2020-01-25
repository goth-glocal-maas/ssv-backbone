FROM node:10-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir -p /opt/app
RUN chown node:node /opt/app

WORKDIR /opt/app

COPY package.json .
USER node
RUN npm install

COPY . .

CMD npm start
