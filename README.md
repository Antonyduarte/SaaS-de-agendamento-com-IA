# Sistema de Agendamento com IA

Projeto backend em Node.js para um sistema de agendamento com módulos de usuários, autenticação e agendamento.

## 📌 Visão Geral

Este projeto fornece uma base para um sistema de agendamentos com:
- cadastro de usuários
- login com autenticação JWT
- agendamentos gerenciáveis
- conexão com banco de dados MySQL via pool
- estrutura modular para separar rotas, serviços e repositórios

> Nota: o projeto ainda está em desenvolvimento e alguns arquivos de rota/controlador estão em esqueleto.

## 🚀 Tecnologias

- Node.js
- Express
- bcrypt
- jsonwebtoken
- dotenv
- cors
- MySQL (`mysql2`)

## 📁 Estrutura do Projeto

- `src/app.js` - configuração principal do Express
- `src/server.js` - inicialização do servidor
- `src/config/db/db.js` - configuração da conexão com o banco de dados
- `src/modules/users/register/` - módulo de cadastro de usuário
- `src/modules/users/login/` - módulo de login de usuário
- `src/modules/agendamentos/` - módulo de agendamentos
- `src/utils/apiRes.js` - utilitários de resposta de API

## ⚙️ Instalação

1. Clone o repositório
   ```bash
   git clone <url-do-repositorio>
   ```
2. Entre na pasta do projeto
   ```bash
   cd "c:/Users/opton/Documents/Node/Sistema de agendamento com IA"
   ```
3. Instale as dependências
   ```bash
   npm install
   ```

## 🧩 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
SERVER_PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=seu_banco
JWT_SECRET=sua_chave_secreta
```

## ▶️ Como Executar

```bash
node src/server.js
```

O servidor será iniciado na porta definida em `SERVER_PORT`.

## 🛠️ Dependências

- `bcrypt` - hashing de senhas
- `cors` - habilitar CORS
- `dotenv` - carregar variáveis de ambiente
- `express` - framework HTTP
- `jsonwebtoken` - geração e verificação de tokens JWT

## 📌 Observações

- Os arquivos de rotas em `src/modules/*/*.routes.js` estão atualmente vazios.
- As implementações de controladores e serviços precisam ser completadas para que a API funcione plenamente.
- A estrutura do projeto está preparada para crescer com novos recursos e validações.

## 💡 Próximos passos sugeridos

- implementar `routes`, `controllers` e integrações de middleware
- adicionar validação de entrada com `Joi` ou `express-validator`
- criar testes automáticos
- configurar logs e tratamento de erros unificado

## 📄 Licença

Este projeto está sob a licença `ISC`.
