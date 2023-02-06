FROM node:18-buster-slim as CLIENT_BUILDER

WORKDIR /app

COPY ./client/package.json ./client/package-lock.json ./

RUN npm install

COPY ./client ./

RUN npm run build

FROM node:18-buster-slim as SERVER_BUILDER

WORKDIR /app

COPY ./server/package.json ./server/package-lock.json ./

RUN npm install

COPY ./server ./

RUN npm run build

FROM node:18-buster-slim

ENV PORT=3000

WORKDIR /app

COPY --from=SERVER_BUILDER /app/package.json /app/package-lock.json ./

RUN npm install --production

COPY --from=SERVER_BUILDER /app/dist ./

COPY --from=CLIENT_BUILDER /app/dist/index.html ./pages/index.html

COPY --from=CLIENT_BUILDER /app/dist/assets/* ./assets/

EXPOSE ${PORT}

CMD ["node", "index.js"]
