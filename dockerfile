FROM node:16-alpine
WORKDIR /app

RUN apk add --no-cache udev ttf-freefont chromium

ENV LANG=ko_KR.UTF-8
ENV LANGUAGE=ko_KR.UTF-8

COPY . .

RUN yarn

EXPOSE 8008

CMD yarn start