FROM node:22 AS builder
WORKDIR /app

COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/package.json /app/package.json

EXPOSE 3000
CMD ["node", "dist/src/main"]