FROM node:22 AS builder

WORKDIR /frontend-shopper-taxi-api

COPY package*.json ./

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /frontend-shopper-taxi-api/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]