FROM node:18.14-alpine3.16
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]