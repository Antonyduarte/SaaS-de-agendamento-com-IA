# 📅 Sistema de Agendamento com IA

Backend de uma plataforma SaaS de agendamentos, desenvolvido com **Node.js** e **Express**, com autenticação via JWT, gerenciamento de usuários, recuperação de senha, controle de agendamentos e diferentes níveis de acesso.

O projeto foi estruturado com uma arquitetura modular, separando **routes, controllers, services e repositories**, mantendo as responsabilidades bem definidas e facilitando a evolução da aplicação.

> 🚧 **Status:** Em desenvolvimento
> O projeto ainda não está pronto para produção. Funcionalidades, regras de negócio, segurança e testes continuam em evolução.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e usuários

* Cadastro de usuários
* Hash de senhas utilizando `bcrypt`
* Login com JWT
* Middleware de autenticação
* Controle de acesso administrativo
* Recuperação de senha por código
* Expiração de códigos de recuperação
* Controle de utilização dos códigos
* Redefinição de senha
* Validação básica dos dados de cadastro

### 📅 Agendamentos

* Criação de agendamentos
* Listagem dos agendamentos do usuário autenticado
* Edição de agendamentos
* Exclusão de agendamentos
* Consulta pública de horários disponíveis
* Visualização administrativa dos agendamentos
* Validação de disponibilidade de horários
* Controle do intervalo mínimo entre agendamentos

### 🌐 Interface

O backend também disponibiliza os arquivos presentes em `public/` como conteúdo estático através do Express.

Atualmente existem páginas HTML para:

* Página inicial
* Painel administrativo

---

## 🛠️ Tecnologias

| Tecnologia       | Utilização                             |
| ---------------- | -------------------------------------- |
| **Node.js**      | Runtime da aplicação                   |
| **Express 5**    | Framework HTTP                         |
| **MySQL**        | Banco de dados                         |
| **mysql2**       | Conexão com MySQL utilizando Pool      |
| **bcrypt**       | Hash de senhas                         |
| **jsonwebtoken** | Autenticação baseada em JWT            |
| **Nodemailer**   | Envio de e-mails                       |
| **dotenv**       | Gerenciamento de variáveis de ambiente |
| **cors**         | Controle de acesso entre origens       |

As dependências do projeto estão definidas no `package.json`.

---

## 📁 Estrutura do projeto

```text
SaaS-de-agendamento-com-IA/
│
├── public/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── api.js
│   │   └── app.js
│   │
│   └── index.html
│
├── src/
│   │
│   ├── config/
│   │   ├── db/
│   │   │   └── db.js
│   │   │
│   │   ├── mail/
│   │   │   ├── mail.js
│   │   │   └── mailerSend.js
│   │   │
│   │   └── schema/
│   │       ├── agendamentos.sql
│   │       ├── clientes.sql
│   │       └── recovery_codes.sql
│   │
│   ├── jobs/
│   │   └── expiredAppointments.js
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
│   │       │   ├── register.repository.js
│   │       │   └── register.service.js
│   │       │
│   │       └── resetPassword/
│   │           ├── resetPassword.controller.js
│   │           ├── resetPassword.repository.js
│   │           └── resetPassword.service.js
│   │
│   ├── utils/
│   │   ├── regex/
│   │   │   └── regex.js
│   │   │
│   │   ├── response/
│   │   │   └── apiRes.js
│   │   │
│   │   └── verify/
│   │       └── verify.js
│   │
│   ├── app.js
│   └── server.js
│
└── .env
    .gitignore
```

A estrutura segue uma organização modular, mantendo os módulos de usuários e agendamentos separados.

---

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura em camadas:

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

Define os endpoints disponíveis e os middlewares utilizados por cada rota.

### Controller

Responsável por receber a requisição HTTP, extrair os dados necessários, chamar o service e retornar a resposta.

### Service

Concentra as regras de negócio da aplicação.

### Repository

Responsável pela comunicação direta com o banco de dados.

Essa separação reduz o acoplamento entre as diferentes partes da aplicação e facilita manutenção e testes.

---

# ⚙️ Requisitos

Antes de executar o projeto, é necessário possuir:

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

Crie o arquivo `.env` na raiz do projeto utilizando `.env.example` como referência.

---

# 🔑 Variáveis de ambiente

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

MAIL_USER=seu_email
MAIL_PASS=sua_senha
MAIL_HOST=sua_host
MAIL_PORT=sua_porta

```

### Variáveis utilizadas

| Variável      | Descrição                                |
| ------------- | ---------------------------------------- |
| `DB_HOST`     | Host do MySQL                            |
| `DB_PORT`     | Porta do MySQL                           |
| `DB_USER`     | Usuário do banco                         |
| `DB_PASS`     | Senha do banco                           |
| `DB_NAME`     | Nome do banco                            |
| `SERVER_PORT` | Porta utilizada pelo servidor            |
| `SECRET_KEY`  | Chave utilizada para assinatura dos JWTs |
| `CORS_ROUTE`  | Origem permitida pelo CORS               |
| `MAIL_USER`   | E-mail remetente de códigos                                                    |
| `MAIL_PASS`   | Senha do E-mail acima                    |
| `MAIL_HOST`   | Host do mailer                           |
| `MAIL_PORT`   | Porta do mailer                          |

> ⚠️ **Importante:** nunca envie o arquivo `.env` para o GitHub.

---

# 🗄️ Banco de dados

Os scripts SQL estão localizados em:

```text
src/config/schema/
```

Atualmente existem schemas relacionados a:

```text
agendamentos.sql
clientes.sql
recovery_codes.sql
```

### Agendamentos

A tabela `agendamentos` utiliza informações como:

```text
id
user_id
nome
data
hora
created_at
modified_at
```

O agendamento possui relação com o usuário responsável por sua criação.

### Códigos de recuperação

A tabela `recovery_codes` é utilizada no processo de recuperação de senha:

```text
id
user_id
code_hash
expires_at
used
used_at
created_at
```

Os códigos são armazenados utilizando hash e possuem controle de expiração e utilização.

---

# ▶️ Executando a aplicação

Inicie o servidor com:

```bash
node src/server.js
```

Por padrão, a aplicação utiliza a porta definida pela variável:

```env
SERVER_PORT
```

Caso ela não esteja definida, a porta padrão utilizada é:

```text
3000
```

O Express também disponibiliza a pasta `public/` como conteúdo estático.

---

# 🌐 API

## Base URL

Em ambiente local:

```text
http://localhost:3000
```

---

# 🔐 Autenticação

As rotas de autenticação são agrupadas em:

```text
/auth
```

## Cadastro

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

## Login

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

## Recuperação de senha

Solicita um código de recuperação:

```http
POST /auth/forgot-password
```

O processo utiliza códigos temporários e envio de e-mail.

---

## Redefinição de senha

```http
PUT /auth/reset-password
```

Utilizado para definir uma nova senha utilizando o código gerado no processo de recuperação.

---

# 📅 Agendamentos

As rotas de agendamento utilizam:

```text
/agendamento
```

## Consultar horários disponíveis

**Pública — não exige JWT.**

```http
GET /agendamento/disponiveis
```

Retorna os horários disponíveis para novos agendamentos.

---

## Criar agendamento

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

## Listar meus agendamentos

**Requer JWT.**

```http
GET /agendamento
```

Retorna os agendamentos pertencentes ao usuário autenticado.

---

## Editar agendamento

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

## Excluir agendamento

**Requer JWT.**

```http
DELETE /agendamento/:id
```

---

## Listar todos os agendamentos

**Requer JWT + permissão administrativa.**

```http
GET /agendamento/admin
```

Essa rota utiliza:

```text
authMiddleware
      ↓
adminMiddleware
      ↓
agendaController.getAllAgenda
```

---

# 🔒 Autorização

A aplicação possui diferentes níveis de acesso.

### Usuário autenticado

Usuários autenticados podem acessar operações relacionadas aos próprios agendamentos.

A autenticação utiliza:

```http
Authorization: Bearer seu_token_jwt
```

### Administrador

Administradores possuem permissões adicionais, incluindo a visualização geral dos agendamentos através das rotas administrativas.

O acesso administrativo é protegido por middleware específico de autorização.

---

# ⏱️ Regra de horários

O sistema possui uma regra de intervalo mínimo entre agendamentos.

O intervalo é definido através da constante:

```text
INTERVALO_ENTRE_AGENDAMENTOS_EM_MINUTOS
```

Essa regra é utilizada para impedir que horários incompatíveis sejam disponibilizados para novos agendamentos.

Atualmente, o intervalo utilizado pelo sistema é de **35 minutos**.

---

# 📧 Recuperação de senha

O projeto possui um fluxo separado para recuperação e redefinição de senha:

```text
forgotpassword/
resetPassword/
```

O processo utiliza:

* Geração de código de recuperação
* Hash do código
* Expiração do código
* Controle de utilização
* Registro da data de utilização
* Envio do código por e-mail

O envio de e-mails é realizado utilizando **Nodemailer**.

---

# 🌍 CORS

O CORS é configurado através da variável:

```env
CORS_ROUTE=http://localhost:3000
```

A aplicação utiliza essa variável para definir a origem permitida.

Em produção, ela deve apontar exclusivamente para o domínio autorizado.

---

# 🧪 Testes

Os testes automatizados ainda estão em desenvolvimento.

A implementação futura deve abranger, principalmente:

* Cadastro
* Login
* Autenticação JWT
* Recuperação de senha
* Redefinição de senha
* Criação de agendamento
* Edição de agendamento
* Exclusão de agendamento
* Disponibilidade de horários
* Conflitos de horários
* Permissões administrativas

---

# 🔐 Segurança

Antes de utilizar a aplicação em produção, ainda é necessário implementar ou reforçar mecanismos como:

* Rate limiting nas rotas de autenticação
* `helmet`
* Validação robusta dos dados de entrada
* Política de senha forte
* Normalização de e-mails
* Validação das variáveis de ambiente durante o boot
* Tratamento centralizado de erros
* Expiração adequada dos JWTs
* Estratégia de refresh/revogação de tokens
* Limitação de tentativas de recuperação de senha
* Invalidação adequada dos códigos de recuperação
* Constraints adicionais no banco de dados
* Logs estruturados
* HTTPS em produção

---

# 📌 Estado atual

### Implementado

* [x] Arquitetura modular
* [x] Cadastro de usuários
* [x] Hash de senhas
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
* [x] Separação em routes, controllers, services e repositories

### Em desenvolvimento

* [ ] Validação robusta de entradas
* [ ] Rate limiting
* [ ] Hardening de segurança
* [ ] Testes automatizados
* [ ] Migrations
* [ ] Logs estruturados
* [ ] Documentação completa da API
* [ ] Padronização dos erros e respostas
* [ ] Melhorias nas regras de conflito de horários
* [ ] Rotinas automáticas para gerenciamento do ciclo de vida dos agendamentos
* [ ] Preparação para ambiente de produção
* [ ] **Integração efetiva com IA**

---

# 🗺️ Próximos passos

A evolução planejada do projeto inclui:

1. Finalizar as regras de negócio dos agendamentos.
2. Implementar o gerenciamento automático do ciclo de vida dos agendamentos.
3. Reforçar as constraints do banco de dados.
4. Implementar validação robusta dos dados.
5. Melhorar o fluxo de autenticação e recuperação de senha.
6. Adicionar testes automatizados.
7. Implementar rate limiting e headers de segurança.
8. Padronizar erros e respostas da API.
9. Criar migrations para o banco de dados.
10. Implementar logs e monitoramento.
11. Documentar completamente a API.
12. **Implementar a integração com IA.**
13. Preparar o projeto para deploy em produção.

---

# 📄 Licença

Este projeto está sob a licença **ISC**.
