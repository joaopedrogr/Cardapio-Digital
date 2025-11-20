# 🔄 Guia de Migração: SQLite → PostgreSQL (Supabase)

## ✅ O que foi feito

### 1. Schema Prisma atualizado
- Alterado `provider` de `"sqlite"` para `"postgresql"`
- Mantidos os modelos `Food` e `User` intactos
- Campo `id` agora usa `SERIAL` (auto-incremento do PostgreSQL)

### 2. Migrations recriadas
- Removidas migrations antigas do SQLite
- Criada nova migration inicial para PostgreSQL: `20251120145033_init_postgres`
- Tabelas `Food` e `User` criadas com sucesso no Supabase

### 3. Configuração do ambiente
- Arquivo `.env` criado com a string de conexão do Supabase
- DATABASE_URL configurada corretamente

### 4. Preparação para deploy na Vercel
- Criado `vercel.json` com configurações de build
- Adicionados scripts de build no `package.json`

---

## 🚀 Instruções de uso local

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Gerar Prisma Client
```bash
npx prisma generate
```

### 3. Rodar o backend
```bash
npm run dev
```

O backend estará rodando em `http://localhost:5000`

---

## 📦 Deploy na Vercel

### 1. Preparar o projeto
Certifique-se de que todos os arquivos foram commitados:
```bash
git add .
git commit -m "Migração para PostgreSQL Supabase"
git push
```

### 2. Configurar variáveis de ambiente na Vercel

Acesse o dashboard da Vercel e adicione as seguintes variáveis:

- `DATABASE_URL`: `postgresql://postgres:cardapiounifacef@db.hvjzdcbxrhgxsieelvuc.supabase.co:5432/postgres`
- `JWT_SECRET`: `tri_fratelli_secret_key_2024_secure`
- `GEMINI_API_KEY`: (sua chave da API Gemini)

### 3. Deploy
```bash
vercel
```

Ou conecte seu repositório GitHub diretamente na interface da Vercel.

### 4. Migrar o banco de dados
Após o primeiro deploy, a Vercel executará automaticamente:
```bash
npx prisma generate
npx prisma migrate deploy
```

---

## 🔍 Verificação

### Testar endpoints localmente:
```bash
# Listar foods
curl http://localhost:5000/api/foods

# Criar food
curl -X POST http://localhost:5000/api/foods \
  -H "Content-Type: application/json" \
  -d '{"name":"Pizza Margherita","price":35.90,"imageUrl":"https://example.com/pizza.jpg"}'
```

### Testar na Vercel:
Substitua `localhost:5000` pela URL do seu deploy na Vercel.

---

## 📋 Checklist

- ✅ Schema Prisma atualizado para PostgreSQL
- ✅ Migrations antigas removidas
- ✅ Nova migration criada e aplicada
- ✅ `.env` configurado com conexão Supabase
- ✅ Prisma Client gerado
- ✅ Backend testado localmente
- ✅ Scripts de build adicionados
- ✅ `vercel.json` criado
- ⬜ Variáveis de ambiente configuradas na Vercel
- ⬜ Deploy realizado na Vercel

---

## ⚠️ Notas importantes

1. **Não altere a string de conexão** - Use exatamente como fornecida
2. **Dados antigos do SQLite não foram migrados** - O banco PostgreSQL está vazio
3. **RLS do Supabase** - Por enquanto não está ativado. Para produção, considere configurar Row Level Security
4. **Prisma versão 6.16.3** - Mantida a versão atual para compatibilidade

---

## 🐛 Troubleshooting

### Erro de conexão com o banco:
```bash
npx prisma db pull
```

### Recrear Prisma Client:
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

### Ver tabelas no banco:
```bash
npx prisma studio
```

Acesse `http://localhost:5555` para visualizar os dados.
