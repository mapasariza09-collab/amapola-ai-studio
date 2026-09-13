# Stage 1: Build the Vite React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* bun.lock* ./

# Install project dependencies
RUN npm install

# Copy source code and build production assets
COPY . .
RUN npm run build

# Stage 2: Ultra-lightweight production server with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration for SPA routing on port 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3000 for Coolify reverse proxy / Traefik
EXPOSE 3000

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
