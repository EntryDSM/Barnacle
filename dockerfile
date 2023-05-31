FROM node:16-alpine
WORKDIR /app

COPY . .

RUN yarn

EXPOSE 8008

CMD yarn start
