
# upload.ia - API

Projeto desenvolvido na NLW IA da Rockeseat, que gera descrições ou títulos para vídeos do YouTube por exemplo, usando IA a partir do seu vídeo.

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/andreyaraujo-dev/nlw-ai-api/main)

![GitHub](https://img.shields.io/github/license/andreyaraujo-dev/nlw-ai-api)

## Stack utilizada

**Back-end:** TypeScript, Prisma, Fastify, zod, openai

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/andreyaraujo-dev/nlw-ai-api
```

Entre no diretório do projeto

```bash
  cd nlw-ai-api
```

Instale as dependências

```bash
  npm install
  # ou
  yarn
```

Rode as migrations

```bash
  yarn prisma:migrate
  # ou
  npm run prisma:migrate
```

Rode o seed para inserir os dados

```bash
  yarn prisma:seed
  # ou
  npm run prisma:seed
```

Inicie a aplicação

```bash
  yarn dev
  # ou
  npm run dev
```

## Contribuindo

Contribuições são sempre bem-vindas!

Caso queira fazer alguma contribuição, fique a vontade para criar um PR.

## Licença
