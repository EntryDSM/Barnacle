FROM node:16-alpine
WORKDIR /app

RUN apk add --no-cache udev ttf-freefont chromium

COPY . .

RUN yarn

EXPOSE 8008

CMD yarn start