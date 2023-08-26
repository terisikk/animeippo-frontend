FROM node:16.17.1-alpine3.16 as builder
WORKDIR /app
COPY . /app

ENV REACT_APP_API_URL ${REACT_APP_API_URL}

RUN npm ci --only=production
RUN npm run build

FROM nginx:1.23.1-alpine
WORKDIR /usr/share/nginx/html/
COPY --from=builder /app/build /usr/share/nginx/html
