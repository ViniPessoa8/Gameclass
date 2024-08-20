FROM node:22-alpine
EXPOSE 3000

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "--env-file=.env", "build"]

