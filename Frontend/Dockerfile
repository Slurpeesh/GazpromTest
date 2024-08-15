FROM node:20 AS build

# Install app dependencies
COPY package.json package.json
RUN npm install

# Bundle app source
COPY . .

RUN npm run build:prod

FROM nginx

COPY --from=build /build /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Default command to run
CMD ["nginx", "-g", "daemon off;"]
