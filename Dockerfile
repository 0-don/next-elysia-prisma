FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma

RUN npm install

# 
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG SECRET
ARG DATABASE_URL
ARG NEXT_PUBLIC_URL
####################
ENV SECRET=$SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL

RUN npm run build

# 
FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "run", "start"]
