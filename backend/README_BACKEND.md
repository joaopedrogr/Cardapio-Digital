# 🧠 Backend – API de Gerenciamento de Itens (Ex: Cardápio / Alimentos)

Este diretório contém o **código-fonte do backend** da aplicação em grupo.  
O objetivo é disponibilizar uma **API RESTful** que será consumida pelo **front-end** e por outros serviços do projeto, centralizando toda a **lógica de negócios**, **persistência de dados** e **comunicação com o banco de dados**.

---

## 📌 Objetivo do Backend

Este backend foi desenvolvido para:

- ✅ Disponibilizar **rotas de API** que serão utilizadas pelo front-end da aplicação em grupo.  
- 📡 Fazer a **ponte entre o banco de dados** (via Prisma) e a interface do usuário.  
- ⚙️ Organizar a lógica do projeto em **camadas** (controllers, models, routes) para facilitar manutenção e colaboração em equipe.  
- 🧰 Servir como base para expansão futura (novas rotas, autenticação, integrações externas etc.).

---

## 🧰 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript no servidor  
- **TypeScript** – Tipagem estática e melhor manutenção do código  
- **Express.js** – Framework minimalista para criação de APIs HTTP  
- **Prisma** – ORM para comunicação com o banco de dados  
- **Docker** – Arquivo `DockerFile` para containerização do serviço  
- **npm** – Gerenciador de dependências

---

## 📁 Estrutura de Pastas

```
backend/
├── .gitignore
├── DockerFile
├── package.json
├── package-lock.json
├── tsconfig.json
├── prisma/
│   └── schema.prisma         # Definição do modelo de dados e conexão com DB
└── src/
    ├── index.ts             # Ponto de entrada da aplicação
    ├── prismaClient.ts      # Inicialização do cliente Prisma
    ├── controllers/
    │   └── foodController.ts  # Lógica de manipulação de "Food"
    ├── models/
    │   └── food.ts            # Modelo de dados (tipagens)
    └── routes/
        └── foodRoutes.ts      # Definição das rotas da API
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) v18+  
- [npm](https://www.npmjs.com/)  
- [Docker](https://www.docker.com/) (opcional, para container)

### 2. Instalar Dependências

No diretório `backend/`:

```bash
npm install
```

### 3. Configurar o Banco de Dados

No arquivo `prisma/schema.prisma`, está definida a estrutura do banco de dados.  
Crie ou configure sua conexão no `.env` (por exemplo):

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meubanco?schema=public"
```

Em seguida, gere as migrações e sincronize com o banco:

```bash
npx prisma migrate dev
```

### 4. Rodar o Servidor

```bash
npm run dev
```

Ou, se usar Docker:

```bash
docker build -t backend-app .
docker run -p 3000:3000 backend-app
```

A API ficará disponível em:  
👉 **http://localhost:3000**

---

## 🌐 Rotas de API

### `GET /food`  
Retorna a lista de alimentos cadastrados no banco.

### `POST /food`  
Cria um novo item de alimento.  
Exemplo de corpo da requisição:

```json
{
  "name": "Pizza Margherita",
  "price": 35.90
}
```

### `PUT /food/:id`  
Atualiza um item existente pelo ID.

### `DELETE /food/:id`  
Remove um item existente.

> ⚠️ Todas as rotas estão definidas em `src/routes/foodRoutes.ts` e a lógica está em `src/controllers/foodController.ts`.

---

## 🧠 Integração com o Projeto em Grupo

Este backend será **consumido pelo front-end** do projeto (ex.: aplicação web ou mobile) para:

- Exibir dados dinâmicos vindos do banco de dados  
- Criar, editar e excluir registros  
- Garantir consistência e centralização da lógica de negócios  
- Permitir que diferentes membros do grupo trabalhem paralelamente (ex.: equipe do front consome endpoints já criados)

👉 Dessa forma, o backend serve como **camada central do sistema**, conectando o banco de dados às interfaces e garantindo que todo o fluxo de dados seja controlado e seguro.

---

## 📌 Próximos Passos Possíveis

- [ ] Implementar autenticação (ex.: JWT)  
- [ ] Adicionar testes automatizados  
- [ ] Criar rotas para outras entidades além de `Food`  
- [ ] Configurar CI/CD para deploy automatizado
