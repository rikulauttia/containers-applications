FROM node:20 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# test stage
FROM base AS test-stage
COPY . .
RUN npm run test

# build stage
FROM base AS build-stage
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN npm run build

# Production Stage
FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]