# Stage 1: Build the Angular app
FROM node:22-alpine AS build

# Build argument
ARG ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build with appropriate environment
RUN npm run build -- --configuration=$ENV

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/demo-front/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
