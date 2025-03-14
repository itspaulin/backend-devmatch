# 🚀 DevMatch - Backend

Backend desenvolvido com **NestJS** para a plataforma **DevMatch**, um sistema de colaboração para desenvolvedores contribuírem em microprojetos open-source.

## 🛠 Tecnologias Utilizadas
- [NestJS](https://nestjs.com/) - Framework para Node.js
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Prisma ORM](https://www.prisma.io/) - ORM para modelagem do banco de dados
- [Passport.js](http://www.passportjs.org/) - Autenticação com OAuth (GitHub/Google)
- [Docker](https://www.docker.com/) - Ambiente de desenvolvimento isolado
- [Redis](https://redis.io/) - Cache para otimizar performance
- [JWT](https://jwt.io/) - Token para autenticação segura
- [Swagger](https://swagger.io/) - Documentação da API

## 📌 Funcionalidades
✅ Autenticação via OAuth (GitHub, Google)  
✅ Gerenciamento de usuários e perfis  
✅ CRUD de projetos open-source  
✅ Match entre desenvolvedores e projetos  
✅ Notificações para novas participações e atualizações  
✅ API documentada com Swagger  

## 🚀 Como Executar o Projeto

### 🔹 **Pré-requisitos**
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) versão 18+
- [Docker](https://www.docker.com/get-started) (Opcional para rodar banco de dados)
- [PostgreSQL](https://www.postgresql.org/) (caso não use Docker)

### 🔹 **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/devmatch-backend.git
cd devmatch-backend
````

### 🔹 **2. Instale as dependências**
````bash
npm install
````
### 🔹 **3. Configure as variáveis de ambiente**
Crie um arquivo .env na raiz do projeto e adicione:
````bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/devmatch"
JWT_SECRET="sua-chave-secreta"
GITHUB_CLIENT_ID="sua-client-id"
GITHUB_CLIENT_SECRET="sua-client-secret"
GOOGLE_CLIENT_ID="sua-client-id"
GOOGLE_CLIENT_SECRET="sua-client-secret"
REDIS_URL="redis://localhost:6379"
````

### 🔹 **4. Rodando com Docker (Banco de Dados)**
Se preferir rodar o PostgreSQL via Docker, use:
````bash
docker-compose up -d
````

### 🔹 **5. Executando a aplicação**
````bash
npm run start:dev
````

**O servidor estará rodando em http://localhost:3000**

### 🔹 **6. Rodando Migrations do Prisma**
````bash
npx prisma migrate dev
````

### 📜 Documentação da API
Após rodar o backend, a documentação estará disponível em:
````bash
http://localhost:3000/api
````

### 📂 Estrutura do Projeto
📦 devmatch-backend
├── 📂 src
│   ├── 📂 auth           # Módulo de autenticação
│   ├── 📂 users          # Módulo de usuários
│   ├── 📂 projects       # Módulo de projetos
│   ├── 📂 notifications  # Módulo de notificações
│   ├── main.ts           # Arquivo principal
│   ├── app.module.ts     # Módulo raiz do NestJS
├── 📂 prisma
│   ├── schema.prisma     # Modelos do banco de dados
├── .env.example          # Exemplo de variáveis de ambiente
├── docker-compose.yml    # Configuração Docker
├── README.md             # Documentação do projeto
└── package.json          # Dependências e scripts

## 📄 Licença
Este projeto é licenciado sob a MIT License.

🚀 Desenvolvido por itspaulin

