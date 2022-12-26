FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]

# Stage 1
# Production build based on Nginx with artifacts from Stage 0
# FROM nginx:1.15.9-alpine
# COPY config/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]