FROM node

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "tsx", "/app/src/server.ts"]
