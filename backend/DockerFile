FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários inicialmente
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila o TypeScript
RUN npm run build

# Expõe a porta do backend
EXPOSE 5000

# Inicia o servidor em produção
CMD ["npm", "run", "start"]
