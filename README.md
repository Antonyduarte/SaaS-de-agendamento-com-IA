# 📅 Sistema de Agendamento com IA

Backend de uma plataforma SaaS de agendamentos, desenvolvida em **Node.js** e **Express**, com autenticação via JWT, gerenciamento de usuários, recuperação de senha, controle de agendamentos e diferentes níveis de acesso.

O projeto utiliza uma arquitetura modular separando **rotas, controllers, services e repositories**, mantendo as responsabilidades organizadas e facilitando a evolução da aplicação.

> 🚧 **Status:** Em desenvolvimento
> O projeto ainda não está pronto para produção e algumas funcionalidades e proteções estão em evolução.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e usuários

* Cadastro de usuários
* Hash de senhas utilizando `bcrypt`
* Login com JWT
* Middleware de autenticação
* Controle de acesso administrativo
* Recuperação de senha por código
* Expiração e controle de códigos de recuperação
* Redefinição de senha
* Validação básica dos dados de cadastro

### 📅 Agendamentos

* Criação de agendamentos
* Listagem dos agendamentos do usuário autenticado
* Edição de agendamentos
* Exclusão de agendamentos
* Consulta pública de horários disponíveis
* Visualização administrativa de todos os agendamentos
* Validação de disponibilidade de horários
* Intervalo mínimo entre agendamentos

### 🌐 Interface

O backend também disponibiliza os arquivos presentes em `public/` como conteúdo estático através do Express.

Atualmente existem páginas HTML para:

* Página inicial
* Painel administrativo

---

## 🛠️ Tecnologias

| Tecnologia       | Utilização                        |
| ---------------- | --------------------------------- |
| **Node.js**      | Runtime da aplicação              |
| **Express 5**    | Framework HTTP                    |
| **MySQL**        | Banco de dados                    |
| **mysql2**       | Conexão com MySQL utilizando Pool |
| **bcrypt**       | Hash de senhas                    |
| **jsonwebtoken** | Autenticação baseada em JWT       |
| **Nodemailer**   | Envio de e-mails                  |
| **dotenv**       | Variáveis de ambiente             |
| **cors**         | Controle de acesso entre origens  |

As dependências atuais estão definidas no `package.json`.

---

## 📁 Estrutura do projeto

```text
SaaS-de-agendamento-com-IA/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── admin.html
│   └── index.html
│
├── src/
│   │
│   ├── config/
│   │   ├── db/
│   │   │   └── db.js
│   │   │
│   │   ├── mail/
│   │   │   └── ...
│   │   │
│   │   └── schema/
│   │       ├── agendamentos.sql
│   │       ├── clientes.sql
│   │       └── recovery_codes.sql
│   │
│   ├── messages/
│   │   └── messages.js
│   │
│   ├── middlewares/
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   └── notFound.middleware.js
│   │
│   ├── modules/
│   │   │
│   │   ├── agendamentos/
│   │   │   ├── agenda.controller.js
│   │   │   ├── agenda.repository.js
│   │   │   ├── agenda.routes.js
│   │   │   └── agenda.service.js
│   │   │
│   │   └── users/
│   │       │
│   │       ├── auth/
│   │       │   └── auth.routes.js
│   │       │
│   │       ├── forgotpassword/
│   │       │   ├── forgotPass.controller.js
│   │       │   ├── forgotPass.repository.js
│   │       │   └── forgotPass.service.js
│   │       │
│   │       ├── login/
│   │       │   ├── login.controller.js
│   │       │   ├── login.repository.js
│   │       │   └── login.service.js
│   │       │
│   │       ├── register/
│   │       │   ├── register.controller.js
│   │       │   ├── register.respository.js
│   │       │   └── register.service.js
│   │       │
│   │       └── resetPassword/
│   │           ├── resetPassword.controller.js
│   │           ├── resetPassword.repository.js
│   │           └── resetPassword.service.js
│   │
│   ├── utils/
│   │   ├── apiRes.js
│   │   └── verify.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

A estrutura atual do repositório possui os módulos de agendamento e usuários separados, incluindo os fluxos de recuperação e redefinição de senha.

---

## 🏗️ Arquitetura

O projeto utiliza uma separação em camadas:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

### Route

Define os endpoints disponíveis e os middlewares necessários.

### Controller

Recebe a requisição HTTP, chama o service responsável e retorna a resposta.

### Service

Concentra as regras de negócio da aplicação.

### Repository

Responsável pela comunicação direta com o banco de dados.

Essa estrutura é utilizada tanto no módulo de usuários quanto no módulo de agendamentos.

---

# ⚙️ Requisitos

Antes de executar o projeto, é necessário ter instalado:

* **Node.js**
* **npm**
* **MySQL**

Também é necessário possuir um banco de dados MySQL configurado.

---

# 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/Antonyduarte/SaaS-de-agendamento-com-IA.git
```

Entre na pasta:

```bash
cd SaaS-de-agendamento-com-IA
```

Instale as dependências:

```bash
npm install
```

---

# 🔑 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto utilizando `.env.example` como referência.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha
DB_NAME=nome_do_banco

SERVER_PORT=3000

SECRET_KEY=sua_chave_jwt_forte

CORS_ROUTE=http://localhost:3000
```

> **Importante:** nunca envie o arquivo `.env` para o GitHub.

A aplicação utiliza `SECRET_KEY` para assinatura e validação dos tokens JWT e `CORS_ROUTE` para definir a origem permitida pelo CORS.

---

# 🗄️ Banco de dados

Os scripts SQL estão localizados em:

```text
src/config/schema/
```

Atualmente existem três schemas:

```text
agendamentos.sql
clientes.sql
recovery_codes.sql
```

## Agendamentos

A tabela `agendamentos` possui atualmente:

```text
id
user_id
nome
data
hora
created_at
modified_at
```

`id` é uma chave primária com incremento automático, enquanto `data` e `hora` são utilizados para representar o horário do agendamento.

## Códigos de recuperação

A tabela `recovery_codes` é utilizada pelo fluxo de recuperação de senha.

Ela armazena:

```text
id
user_id
code_hash
expires_at
used
used_at
created_at
```

Os códigos são armazenados utilizando hash e possuem controle de expiração e utilização. A tabela também possui relacionamento com `clientes`.

---

# ▶️ Executando a aplicação

Inicie o servidor com:

```bash
node src/server.js
```

O servidor utilizará a porta definida em:

```env
SERVER_PORT
```

Caso a porta não seja definida, a aplicação utiliza `3000`.

O Express também disponibiliza a pasta `public/` como conteúdo estático.

---

# 🌐 API

Base URL local:

```text
http://localhost:3000
```

---

## 🔐 Autenticação

As rotas de autenticação são agrupadas em:

```text
/auth
```

### Cadastro

```http
POST /auth/register
```

Body:

```json
{
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "senha": "senhaSegura123"
}
```

---

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "maria@example.com",
  "senha": "senhaSegura123"
}
```

O login retorna um token JWT utilizado para acessar as rotas protegidas.

---

### Recuperação de senha

Solicita um código de recuperação:

```http
POST /auth/forgot-password
```

O fluxo utiliza o sistema de códigos de recuperação e envio de e-mail.

---

### Redefinição de senha

```http
PUT /auth/reset-password
```

Utilizado para definir uma nova senha utilizando o processo de recuperação.

As quatro rotas acima estão atualmente registradas em `auth.routes.js`.

---

# 📅 Agendamentos

As rotas de agendamento utilizam:

```text
/agendamento
```

---

### Consultar horários disponíveis

**Pública — não exige JWT.**

```http
GET /agendamento/disponiveis
```

Retorna os horários que podem ser reservados.

---

### Criar agendamento

**Requer JWT.**

```http
POST /agendamento
```

Header:

```http
Authorization: Bearer seu_token_jwt
```

Body:

```json
{
  "nome": "Consulta",
  "data": "2026-07-20",
  "hora": "14:30:00"
}
```

---

### Listar meus agendamentos

**Requer JWT.**

```http
GET /agendamento
```

O usuário autenticado consulta os seus próprios agendamentos.

---

### Editar agendamento

**Requer JWT.**

```http
PUT /agendamento
```

Body:

```json
{
  "id": 1,
  "data": "2026-07-21",
  "hora": "15:00:00"
}
```

---

### Excluir agendamento

**Requer JWT.**

```http
DELETE /agendamento/:id
```

---

### Listar todos os agendamentos

**Requer JWT + permissão administrativa.**

```http
GET /agendamento/admin
```

Essa rota é protegida pelo `authMiddleware` e pelo `adminMiddleware`.

---

# 🔒 Autorização

A API possui dois níveis principais de acesso:

### Usuário autenticado

Pode acessar operações relacionadas aos próprios agendamentos.

```http
Authorization: Bearer seu_token_jwt
```

### Administrador

Além das operações autenticadas, possui acesso à consulta geral:

```http
GET /agendamento/admin
```

A rota administrativa passa por:

```text
authMiddleware
      ↓
adminMiddleware
      ↓
agendaController.getAllAgenda
```

---

# ⏱️ Regra de horários

O módulo de agendamentos possui uma regra de intervalo mínimo entre horários.

O valor utilizado atualmente é definido no service de agenda:

```text
INTERVALO_ENTRE_AGENDAMENTOS_EM_MINUTOS
```

Essa regra evita que horários incompatíveis sejam disponibilizados para novos agendamentos.

---

# 📧 Recuperação de senha

O projeto possui um fluxo dedicado para recuperação de senha:

```text
forgotpassword/
```

e:

```text
resetPassword/
```

O fluxo utiliza códigos de recuperação armazenados na tabela `recovery_codes`, com:

* Hash do código
* Data de expiração
* Controle de utilização
* Data de utilização
* Relacionamento com o usuário

O projeto também possui `Nodemailer` entre suas dependências para envio de e-mails.

---

# 🌍 CORS

O CORS é configurado através da variável:

```env
CORS_ROUTE=http://localhost:3000
```

A aplicação utiliza essa variável para definir a origem permitida:

```javascript
cors({
    origin: process.env.CORS_ROUTE
})
```

Em produção, essa variável deve apontar somente para o domínio autorizado.

---

# 🧪 Testes

Os testes automatizados ainda não estão implementados no projeto.

A próxima etapa recomendada é adicionar testes para:
"
* Cadastro
* Login
* JWT
* Recuperação de senha
* Redefinição de senha
* Criação de agendamento
* Edição de agendamento
* Exclusão de agendamento
* Conflito de horários
* Permissões administrativas

---

# 🔐 Segurança

Antes de utilizar o sistema em produção, recomenda-se implementar:

* Rate limiting nas rotas de autenticação
* `helmet`
* Validação robusta dos dados de entrada
* Política de senha forte
* Normalização de e-mails
* Validação das variáveis de ambiente no boot
* Tratamento centralizado de erros
* Expiração adequada dos JWT
* Estratégia de refresh/revogação de tokens
* Limitação de tentativas de recuperação de senha
* Expiração e invalidação adequada dos códigos de recuperação
* Constraints adicionais no banco
* Logs estruturados
* HTTPS em produção

---

# 📌 Estado atual

### Implementado

* [x] Estrutura modular
* [x] Cadastro de usuários
* [x] Hash de senha
* [x] Login
* [x] JWT
* [x] Middleware de autenticação
* [x] Middleware administrativo
* [x] CRUD de agendamentos
* [x] Consulta pública de horários disponíveis
* [x] Recuperação de senha
* [x] Redefinição de senha
* [x] Códigos de recuperação
* [x] Envio de e-mail
* [x] Pool de conexão MySQL
* [x] Servir arquivos estáticos pelo Express

### Em desenvolvimento

* [ ] Validação robusta de entradas
* [ ] Rate limiting
* [ ] Hardening de segurança
* [ ] Testes automatizados
* [ ] Migrations
* [ ] Logs estruturados
* [ ] Documentação completa dos códigos de erro
* [ ] Melhorias nas regras de conflito de horários
* [ ] Preparação para ambiente de produção

---

# 🗺️ Próximos passos

A evolução recomendada do projeto é:

1. Finalizar as regras de negócio dos agendamentos.
2. Reforçar as constraints do banco.
3. Implementar validação robusta.
4. Melhorar o fluxo de autenticação e recuperação de senha.
5. Adicionar testes automatizados.
6. Implementar rate limiting e headers de segurança.
7. Padronizar erros e respostas da API.
8. Criar migrations.
9. Implementar logs e monitoramento.
10. Preparar o deploy em ambiente de produção.

---

# 📄 Licença

Este projeto está sob a licença **ISC**.
