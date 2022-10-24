FROM node:18-slim

WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . .
EXPOSE 4000
CMD ["node", "--max-http-header-size=16384", "server.js"]
