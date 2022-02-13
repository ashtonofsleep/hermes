FROM node:16

WORKDIR /usr/src/hermes

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm", "run", "start"]