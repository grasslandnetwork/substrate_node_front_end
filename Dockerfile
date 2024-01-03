FROM node:16.19.0-alpine as build
# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
# COPY package.json yarn.lock ./


# Copy the rest of the code
COPY . .

# Install dependencies
RUN yarn install

# Build the project
RUN yarn build

# Stage 2: Serve the React app with Nginx
#FROM nginx:stable-alpine

# Copy the build output to replace the default Nginx contents.
# COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8000
EXPOSE 8000

# CMD yarn start

# # Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]


# Stage 2: Serve the React app with http-server
# http-server has no security features, load balancing etc so it should only be used as a personal server
WORKDIR /app/build
ENTRYPOINT ["npx", "http-server", "-p", "8000"]
