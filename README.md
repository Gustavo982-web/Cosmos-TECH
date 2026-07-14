# 🚀 Cosmos-TECH

Plataforma educacional interativa sobre o universo — aprenda sobre o Sistema Solar e viagens espaciais através de conteúdos e quizzes.

## 📋 Tecnologias

- **Backend:** Node.js + Express
- **Banco de Dados:** MySQL 8.0 (local via Docker ou AWS RDS)
- **Frontend:** HTML5, CSS3, JavaScript, Chart.js
- **Infraestrutura:** Docker + Docker Compose

## 📁 Estrutura do Projeto

```
Cosmos-TECH/
├── app.js                    # Ponto de entrada da aplicação
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env                      # Config produção (RDS AWS)
├── .env.dev                  # Config desenvolvimento (MySQL local)
├── .env.example              # Template de variáveis de ambiente
├── docker/
│   └── mysql/
│       └── init.sql          # Script de inicialização do banco
├── src/
│   ├── database/
│   │   └── config.js         # Connection pool com suporte a SSL/RDS
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   └── quizController.js
│   ├── models/
│   │   ├── usuarioModel.js
│   │   └── quizModel.js
│   └── routes/
│       ├── index.js
│       ├── usuarios.js
│       └── quiz.js
└── Site/app/
    ├── global.css            # Estilos globais (variáveis, navbar, footer)
    ├── index.html            # Landing page
    ├── login.html/css        # Tela de login
    ├── cadastro.html/css     # Tela de cadastro
    ├── software.html/css     # Quiz Sistema Solar
    ├── viagens.html/css      # Quiz Viagens Espaciais
    └── dashboard.html/css    # Dashboard de resultados
```

## 🚀 Como Rodar

### Opção 1: Docker Compose (Recomendado)

#### Desenvolvimento (MySQL local)

```bash
docker compose --profile dev up --build
```

Isso inicia:
- App Node.js na porta **3333**
- MySQL 8.0 na porta **3306** (com banco e tabelas criados automaticamente)

Acesse: http://localhost:3333

#### Produção (Conectando ao RDS AWS)

1. Edite o arquivo `.env` com os dados do seu RDS:

```env
NODE_ENV=production
DB_HOST=seu-endpoint.region.rds.amazonaws.com
DB_DATABASE=cosmos
DB_USER=admin
DB_PASSWORD=sua-senha-segura
DB_PORT=3306
APP_PORT=8080
APP_HOST=0.0.0.0
```

2. Suba a aplicação:

```bash
docker compose --profile prod up --build
```

Acesse: http://localhost:8080

### Opção 2: Rodar Local (sem Docker)

```bash
# Instalar dependências
npm install

# Desenvolvimento (precisa de MySQL rodando local)
npm run dev

# Produção
npm start
```

## 🗄️ Configuração do RDS MySQL na AWS

Para conectar com o Amazon RDS:

1. **Crie uma instância RDS MySQL 8.0** na AWS
2. **Configure o Security Group** para permitir conexões na porta 3306 do IP/VPC da sua aplicação
3. **Crie o banco de dados `cosmos`** no RDS:
   ```sql
   CREATE DATABASE cosmos;
   ```
4. **Execute o script de tabelas** (`docker/mysql/init.sql`) no RDS usando um client MySQL:
   ```bash
   mysql -h seu-endpoint.rds.amazonaws.com -u admin -p cosmos < docker/mysql/init.sql
   ```
5. **Atualize o `.env`** com o endpoint e credenciais do RDS
6. **Suba a aplicação** com `docker compose --profile prod up --build`

> A conexão já possui SSL habilitado automaticamente em modo produção para comunicação segura com o RDS.

## 🛑 Parar a Aplicação

```bash
# Parar containers
docker compose --profile dev down

# Parar e remover volumes (apaga dados do MySQL local)
docker compose --profile dev down -v
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NODE_ENV` | Ambiente (development/production) | `production` |
| `DB_HOST` | Host do banco de dados | `endpoint.rds.amazonaws.com` |
| `DB_DATABASE` | Nome do banco | `cosmos` |
| `DB_USER` | Usuário do banco | `admin` |
| `DB_PASSWORD` | Senha do banco | `sua-senha` |
| `DB_PORT` | Porta do banco | `3306` |
| `APP_PORT` | Porta da aplicação | `8080` |
| `APP_HOST` | Host da aplicação | `0.0.0.0` |

## 👨‍💻 Autor

Gustavo Henrique — © 2025
