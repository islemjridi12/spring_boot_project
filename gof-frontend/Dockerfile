# Step 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Clean default content
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular app
COPY --from=build /app/dist/gof-frontend/browser /usr/share/nginx/html

# Add custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
