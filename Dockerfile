FROM node:18-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose ports for frontend and backend
EXPOSE 5000 5173

# Default command (will be overridden in docker-compose)
CMD ["npm", "start"]

