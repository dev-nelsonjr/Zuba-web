# Zuba Web

Interface web do **Zuba**, um MVP de controle financeiro pessoal. O usuário pode administrar receitas e despesas, acompanhar o resultado de cada mês e manter o mesmo fluxo disponível no aplicativo mobile.

O projeto foi desenvolvido individualmente e integra a [API](https://github.com/dev-nelsonjr/Zuba-api) e o [aplicativo mobile](https://github.com/dev-nelsonjr/zuba-mobile).

**Aplicação publicada:** [zuba-web.onrender.com](https://zuba-web.onrender.com)

> A API utiliza uma instância gratuita e pode levar cerca de um minuto para responder ao primeiro acesso após um período de inatividade.

## Funcionalidades

- Cadastro e login
- Sessão autenticada com persistência local
- Dashboard de receitas, despesas e saldo mensal
- Navegação entre meses e anos
- Cadastro de receitas e despesas
- Definição de data de vencimento
- Alteração do status entre pendente e concluída
- Exclusão de transações
- Estados de carregamento, vazio e erro
- Menu adaptado para telas menores
- Componentes reutilizáveis documentados com Storybook
- Testes dos fluxos principais

## Tecnologias

- React e TypeScript
- Vite e React Router
- TanStack Query e Axios
- Formik e Yup
- styled-components e styled-system
- Storybook
- Testing Library e Vitest

## Estrutura

```text
src/
  assets/       recursos visuais
  components/   componentes, composição visual e providers
  pages/        autenticação, dashboard e transações
  services/     SDK e comunicação com a API
```

O SDK concentra as chamadas HTTP, o TanStack Query controla o estado remoto e os providers cuidam de tema, persistência e autenticação. A interface é composta por componentes reutilizados entre as páginas.

## Executando localmente

### Pré-requisitos

- Node.js e Yarn
- [Zuba API](https://github.com/dev-nelsonjr/Zuba-api) em execução

```bash
git clone https://github.com/dev-nelsonjr/Zuba-web.git
cd Zuba-web
yarn install
```

Copie `.env.example` para `.env` e informe a URL da API:

```env
VITE_API_URL=http://localhost:9900
```

Inicie a aplicação:

```bash
yarn start
```

O Vite exibirá no terminal o endereço local da aplicação.

## Qualidade

```bash
yarn typecheck
yarn lint:all
yarn test
yarn build
```

Para desenvolver e consultar os componentes isoladamente:

```bash
yarn storybook
```

## Deploy

O arquivo [`render.yaml`](render.yaml) configura a aplicação estática e o fallback das rotas do React Router. No ambiente de hospedagem, `VITE_API_URL` deve apontar para a API publicada.

## Escopo do MVP

O cliente Web cobre autenticação e o gerenciamento mensal de transações de ponta a ponta. Recuperação de senha, categorias, metas financeiras e relatórios avançados permanecem fora do escopo atual.
