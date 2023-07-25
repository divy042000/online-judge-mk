FROM node:16-alpine
RUN apk add --no-cache build-base
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]