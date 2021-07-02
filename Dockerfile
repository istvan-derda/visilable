FROM node:14-alpine

WORKDIR /app

COPY rollup.config.js ./
COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm run-script build

EXPOSE 5000

ENV PORT = 5000
ENV HOST = 0.0.0.0

CMD ["npm", "start"]