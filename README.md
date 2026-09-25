# Zuba Web

Interface web do **Zuba**, uma aplicação de planejamento de fluxo de caixa pessoal. O usuário cadastra receitas e despesas previstas, acompanha o saldo mensal e marca cada transação como recebida ou paga.

O projeto foi desenvolvido individualmente e integra a [API](https://github.com/dev-nelsonjr/Zuba-api) e o [aplicativo mobile](https://github.com/dev-nelsonjr/zuba-mobile).

**Aplicação publicada:** [zuba-web.onrender.com](https://zuba-web.onrender.com)

> A API utiliza uma instância gratuita e pode levar cerca de um minuto para responder ao primeiro acesso após um período de inatividade.

<img width="1908" height="848" alt="Dashboard do Zuba Web" src="https://github.com/user-attachments/assets/d78e41e2-eb86-4c05-ba23-c580dae305a4" />

<img width="1897" height="845" alt="Transações no Zuba Web" src="https://github.com/user-attachments/assets/3241310d-2eed-495a-bd22-c6da5bfa9dc7" />

<img width="1894" height="840" alt="Cadastro de transação no Zuba Web" src="https://github.com/user-attachments/assets/22a0f5df-0ad5-4590-a0b8-52c826224285" />

## Funcionalidades

- Cadastro e login
- Sessão autenticada com persistência local
- Dashboard de receitas, despesas e saldo mensal previsto
- Navegação entre meses e anos
- Cadastro de receitas e despesas previstas
- Definição de data de vencimento
- Status inicial pendente
- Marcação de receitas como recebidas e despesas como pagas
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

O cliente Web cobre autenticação, planejamento mensal e acompanhamento de receitas e despesas de ponta a ponta. Recuperação de senha, categorias, metas financeiras e relatórios avançados permanecem fora do escopo atual.
