FROM node:18-slim as build

WORKDIR /app
COPY package*.json /app/

RUN yarn
COPY ./ /app/
RUN yarn build

FROM nginx:1.23.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
