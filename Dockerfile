FROM node:20

WORKDIR /app

RUN npm install -g json-server@0.17.4

COPY src/app/mock/heroes.json ./heroes.json

EXPOSE 3000

CMD ["json-server", "--watch", "heroes.json", "--host", "0.0.0.0", "--port", "3000"]