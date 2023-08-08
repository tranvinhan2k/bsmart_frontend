# Image base
FROM node:14

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy source code
COPY . .

# Expose port
EXPOSE 2053

# Start the app
CMD ["yarn", "dev"]