FROM node:14-alpine
WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3030

CMD yarn start