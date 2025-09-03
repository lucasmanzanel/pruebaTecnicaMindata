FROM node:20

WORKDIR /app

RUN npm install -g json-server

COPY src/app/mock/heroes.json ./heroes.json

EXPOSE 3000

CMD ["json-server", "--watch", "heroes.json"]