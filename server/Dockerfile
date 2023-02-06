FROM node:18-buster-slim AS builder

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-buster-slim

ENV PORT=3000

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --production

COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/index.js"]
