# Build
FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY . /app

ENV NODE_ENV=production

RUN npm run build --verbose

# Production
FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html/

COPY --from=builder /app/dist /usr/share/nginx/html