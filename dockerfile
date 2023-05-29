FROM node:16-alpine
WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3030

CMD yarn start