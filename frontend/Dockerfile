FROM node:22 AS builder

WORKDIR /frontend-shopper-taxi-api

COPY package*.json ./

COPY . .

ARG GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY=${GOOGLE_API_KEY}

RUN npm run build

FROM nginx:alpine

COPY --from=builder /frontend-shopper-taxi-api/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 5173

ENV VITE_GOOGLE_API_KEY=${GOOGLE_API_KEY}

CMD ["nginx", "-g", "daemon off;"]