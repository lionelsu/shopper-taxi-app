FROM node:22-alpine

WORKDIR /backend-shopper-taxi-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
