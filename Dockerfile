FROM node:lts-alpine

WORKDIR /user/src/app

COPY . .
COPY .env.docker ./.env

RUN npm ci --omit=dev

RUN npm install -g @nestjs/cli

RUN npm run build

ENTRYPOINT [ "npm", "run", "start:container" ]
