FROM node:12-alpine
WORKDIR /root/app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 8080
CMD npm start