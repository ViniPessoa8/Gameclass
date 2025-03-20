FROM node:22-alpine
EXPOSE 3000

WORKDIR /app
COPY package.json package-lock.json ./

RUN echo "Conteúdo do arquivo teste" > /var/lib/postgresql/data/teste.txt \
    && chown postgres:postgres /var/lib/postgresql/data/teste.txt \
    && chmod 644 /var/lib/postgresql/data/teste.txt

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "--env-file=.env", "build"]

