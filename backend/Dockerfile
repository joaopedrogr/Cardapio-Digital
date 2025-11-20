FROM node:18-alpine

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto (incluindo /prisma)
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Aplica o schema no banco (Cria tabelas no Supabase)
RUN npx prisma db push

# Compila TypeScript
RUN npm run build

# Expor porta usada no Render
EXPOSE 5000

# Start do servidor
CMD ["npm", "run", "start"]
