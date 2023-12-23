# base
FROM node:21.2.0-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./
    
RUN npm install

COPY . .

# for build

FROM base as builder

WORKDIR /usr/src/app

RUN npm run build


# for production

FROM node:21.2.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./

ENTRYPOINT ["node", "./index.js"]