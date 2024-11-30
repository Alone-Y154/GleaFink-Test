# Node build stage
FROM node:alpine3.18 as nodework

# Set working directory
WORKDIR /GLEAFINK-TEST

# Install dependencies
COPY package.json .
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:1.23-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx content
RUN rm -rf ./*

# Copy built files from Node stage
COPY --from=nodework /GLEAFINK-TEST/dist .

# Expose port and run Nginx
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
