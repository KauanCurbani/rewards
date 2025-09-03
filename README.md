# Be Sistemas | Recompensas

Aplicação Next.js (React) com validações de formulários, rotas protegidas e testes e2e e unitários.

## Links

- Recompensas públicas: https://plan.curbanii.net/public-rewards
  - Formatação de datas relativas (Intl)
  - SSR
  - CSS/MUI
- Login: https://plan.curbanii.net/login
  - Teste Playwright
  - Zod e React Hook Form para validação
  - MUI
- Admin: https://plan.curbanii.net/
  - Rotas protegidas usando React Context
  - Zod e React Hook Form para validação
  - Full MUI

## Tecnologias

- Next.js 15, React 19
- MUI (Material UI)
- Zod + React Hook Form
- Axios, date-fns
- Testes: Playwright (e2e) e Jest/RTL (unitário)

## Arquivos de teste

- Playwright: `./tests/login.spec.ts`
- Jest: `./src/domain/useCases/rewardUseCase.spec.ts`

## Como rodar

Pré-requisitos: Node 18+ e pnpm.

Instalação de dependências:

```sh
pnpm install
```

Ambiente de desenvolvimento (http://localhost:3000):

```sh
pnpm dev
```

Build de produção e start:

```sh
pnpm build
pnpm start
```

## Testes

- Unitários (Jest):

```sh
pnpm test
```

- E2E (Playwright UI):

```sh
pnpm test:playwright
```

## Deploy

Deploy usando Docker na VPS, baseado no `Dockerfile` deste repositório. App disponível em: https://plan.curbanii.net/
