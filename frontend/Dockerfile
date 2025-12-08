# Stage 1: Builder
FROM node:22-alpine as builder

WORKDIR /app/frontend

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . /app/frontend/

# Build the project
RUN yarn build

EXPOSE 5173