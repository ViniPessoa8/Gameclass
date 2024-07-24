FROM node:22-alpine
EXPOSE 3000

WORKDIR /app
COPY package.json package-lock.json 01-cria-tabelas.sql 02-insert-statements.sql ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "build"]
