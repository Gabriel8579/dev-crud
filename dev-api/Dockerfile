FROM node:15.0-alpine

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000:3000

CMD ["npm", "run", "start:docker:dev"]