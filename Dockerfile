# Image base
FROM node:14

# Set work directory
WORKDIR /apps

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["yarn", "dev"]