# 🍕 TRI FRATELLI BACKEND
## Sobre o Projeto
API REST desenvolvida em Node.js + Express, utilizando TypeScript, Prisma e Supabase PostgreSQL, com autenticação via JWT, segurança com bcrypt e integração com IA Gemini para recomendações inteligentes.

Link do backend: https://cardapio-digital-tmu7.onrender.com/
## Tecnologias
![Node.js](https://skillicons.dev/icons?i=nodejs)
![Express](https://skillicons.dev/icons?i=express)
![Typescript](https://skillicons.dev/icons?i=typescript)
![Prisma](https://skillicons.dev/icons?i=prisma)
![supabase](https://skillicons.dev/icons?i=supabase)
![postgres](https://skillicons.dev/icons?i=postgres)
![Docker](https://skillicons.dev/icons?i=docker)
- Node.js + Express — API REST completa
- TypeScript — Tipagem segura
- Prisma ORM — Mapeamento de dados
- Supabase (PostgreSQL) — Banco SQL principal
- bcrypt — Criptografia de senhas
- JWT — Autenticação e proteção de rotas
- Docker & Docker Compose — Containerização da aplicação
- API Gemini — IA generativa para análise e recomendações
## Rodando o Projeto
```
cd backend
npm install
cp .env.example .env
```
Preencher:
```
DATABASE_URL="postgresql://..."
SUPABASE_URL="..."
SUPABASE_KEY="..."
GEMINI_API_KEY="..."
JWT_SECRET="..."
```
```
npx prisma migrate dev
npm run dev
```
