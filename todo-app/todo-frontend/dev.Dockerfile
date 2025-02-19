FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Copy all files
COPY . .

# Set environment variables
ENV NODE_ENV=development

# Expose port for Vite dev server
EXPOSE 5173

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]