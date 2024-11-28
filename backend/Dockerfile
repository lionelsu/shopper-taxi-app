FROM node:22-alpine

WORKDIR /backend-shopper-taxi-api

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /backend-shopper-taxi-api/entrypoint.sh



# RUN npx prisma migrate dev --name rides_model
# RUN npx prisma generate

EXPOSE 8080

# ENTRYPOINT [ "npm", "run" ]
# CMD [ "start" ]

ENTRYPOINT ["/backend-shopper-taxi-api/entrypoint.sh"]
