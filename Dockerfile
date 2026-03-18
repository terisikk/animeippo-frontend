FROM node:22-alpine as builder
WORKDIR /app
COPY . /app

ENV NODE_ENV production

RUN npm ci --only=production
RUN npm run build --verbose

FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html/
COPY --from=builder /app/build /usr/share/nginx/html
