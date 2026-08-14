# Zuba Web

Interface web do **Zuba**, uma aplicação de controle financeiro pessoal. Nela, o usuário pode acessar sua conta, registrar receitas e despesas e acompanhar o resumo financeiro de cada mês.

O projeto foi desenvolvido individualmente e faz parte de um MVP full stack composto por esta interface, pela [API](https://github.com/dev-nelsonjr/Zuba-api) e pelo [aplicativo mobile](https://github.com/dev-nelsonjr/zuba-mobile).

## Funcionalidades

- Cadastro e login de usuários
- Sessão autenticada com persistência local
- Dashboard financeiro mensal
- Visualização de receitas, despesas e saldo
- Filtro de transações por mês
- Cadastro de receitas e despesas
- Componentes reutilizáveis documentados com Storybook
- Testes dos principais fluxos de autenticação

## Tecnologias

- React 19
- React Router
- TanStack Query
- Axios
- Formik e Yup
- styled-components e styled-system
- Storybook
- Testing Library e Jest

## Como executar

### Pré-requisitos

- Node.js 18 ou superior
- Yarn 1
- [Zuba API](https://github.com/dev-nelsonjr/Zuba-api) executando localmente

```bash
git clone https://github.com/dev-nelsonjr/Zuba-web.git
cd Zuba-web
yarn
```

Crie um arquivo `.env` na raiz:

```env
NODE_ENV=development
REACT_APP_API_ENV=custom
REACT_APP_CUSTOM_URL=http://localhost:9900
```

Inicie a aplicação:

```bash
yarn start
```

A interface ficará disponível em `http://localhost:3000`.

## Storybook

```bash
yarn storybook
```

## Testes

```bash
yarn test --watchAll=false --runInBand
```

## Build

```bash
yarn build
```

## Status

O projeto está em estágio de MVP e cobre o fluxo principal de uma aplicação financeira: autenticação, cadastro de transações e consulta do dashboard mensal.
