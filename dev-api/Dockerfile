FROM node:15.7.0-alpine

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000:8000

CMD ["npm", "run", "start:docker:dev"]