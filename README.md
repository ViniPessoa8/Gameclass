
## Ambientes
Dependendo do ambiente em que você for rodar o projeto, é necessário criar o respectivo arquivo de ambiente na pasta raiz do projeto:
- dev: `.env`
- prod: `.env.prod` 

Há um arquivo de exemplo no repositório com o nome `.env.example` que você pode se basear para criar os demais.

### Desenvolvimento
Para rodar o sistema em ambiente de desenvolvimento (local), você deve:
1. instalar as dependências do projeto com `npm install` ou `yarn`
2. Rodar o container Docker com `docker compose up --build` (adicione `-d` caso queira que rode em segundo plano)
3. Executar o comando `npm run dev` para iniciar o servidor de desenvolvimento.

url: http://localhost:5173/

### Produção
Para rodar o sistema em ambiente de produção, você deve:
1. Ter o Docker e Docker Compose instalados.
2. Buildar e iniciar o container, a partir da raiz do projeto.
    - `docker compose up --build`

url: http://localhost:3000/

