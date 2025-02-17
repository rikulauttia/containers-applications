FROM node:20 AS build-stage

WORKDIR /usr/src/app

# Copy only package.json and install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Pass the backend URL to Vite
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build the frontend
RUN npm run build

# Production Stage
FROM nginx:1.25-alpine

# Copy built frontend files to Nginx's web root
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]