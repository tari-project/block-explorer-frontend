FROM node:18-alpine

RUN apk add -U bash sed grep
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
COPY .env.docker.build .env
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["./scripts/docker-entrypoint.sh"]
