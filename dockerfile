FROM node:16-alpine
WORKDIR /app

RUN apk add --no-cache udev ttf-freefont chromium

RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone

COPY . .

RUN yarn

EXPOSE 8008

CMD yarn start