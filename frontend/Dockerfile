# Use a node base image
FROM node:22-alpine as builder

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and yarn.lock into directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy everything else
COPY . /app/frontend/

# Build the project
RUN yarn build

# Expose the frontend on port 5173
EXPOSE 5173