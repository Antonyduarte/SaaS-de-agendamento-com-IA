# Sistema de Agendamento com IA

Backend em Node.js para um SaaS de agendamentos com cadastro de usuarios, login com JWT e gerenciamento de horarios por usuario.

O projeto ainda esta em desenvolvimento. A base ja possui separacao por rotas, controllers, services e repositories, mas ainda precisa de melhorias de validacao, seguranca, banco de dados e testes antes de ser usado em producao.

## Tecnologias

- Node.js
- Express
- MySQL com `mysql2/promise`
- bcrypt
- jsonwebtoken
- dotenv
- cors

## Estrutura

```text
src/
  app.js                         # Configuracao principal do Express
  server.js                      # Inicializacao do servidor
  config/
    db/db.js                     # Pool de conexao MySQL
    schema/                      # Scripts SQL iniciais
  middlewares/
    auth.middleware.js           # Validacao de JWT
    notFound.middleware.js       # Resposta para rotas inexistentes
  modules/
    users/
      auth/auth.routes.js        # Rotas de login e cadastro
      login/                     # Controller, service e repository de login
      register/                  # Controller, service e repository de cadastro
    agendamentos/                # Rotas e regras de agendamento
  utils/
    apiRes.js                    # Padrao de resposta da API
    verify.js                    # Validacao basica do cadastro
```

## Requisitos

- Node.js instalado
- MySQL rodando
- Banco de dados criado
- Arquivo `.env` configurado na raiz do projeto

## Instalacao

1. Clone o repositorio:

```bash
git clone https://github.com/Antonyduarte/SaaS-de-agendamento-com-IA.git
```

2. Entre na pasta:

```bash
cd SaaS-de-agendamento-com-IA
```

3. Instale as dependencias:

```bash
npm install
```

4. Crie o arquivo `.env` com base em `.env.example`.

## Variaveis de Ambiente

```env
DB_PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=nome_do_banco

SERVER_PORT=3000

SECRET_KEY=sua_chave_jwt_forte
```

Observacao: o codigo usa `SECRET_KEY` para assinar e validar JWT. Use uma chave longa e aleatoria em ambientes reais.

## Banco De Dados

Os schemas ficam em:

- `src/config/schema/clientes.sql`
- `src/config/schema/agendamentos.sql`

Antes de rodar a aplicacao, revise o schema de `agendamentos`, pois ele precisa estar alinhado com o codigo. A tabela deve conter, no minimo:

- `id`
- `user_id`
- `nome`
- `data`
- `hora`
- `created_at`
- `modified_at`

Tambem e recomendado adicionar:

- `PRIMARY KEY (id)`
- `FOREIGN KEY (user_id) REFERENCES clientes(id)`
- indice unico para impedir conflito de horarios, conforme a regra do produto

Exemplo de regra:

```sql
UNIQUE KEY unique_user_schedule (user_id, data, hora)
```

Use essa regra se cada usuario nao puder repetir o mesmo horario. Se o sistema deve impedir que qualquer usuario agende um horario ja ocupado, use:

```sql
UNIQUE KEY unique_schedule_slot (data, hora)
```

O codigo tambem valida um intervalo de 35 minutos entre quaisquer dois agendamentos. Assim, depois de um horario `13:00`, os proximos horarios disponiveis comecam em `13:35`. Para alterar esse valor, ajuste `INTERVALO_ENTRE_AGENDAMENTOS_EM_MINUTOS` em `src/modules/agendamentos/agenda.service.js`.

## Como Executar

```bash
node src/server.js
```

O servidor sera iniciado na porta configurada em `SERVER_PORT`. Se a variavel nao existir, a porta padrao sera `3000`.

## Rotas Da API

Base local:

```text
http://localhost:3000
```

### Autenticacao

#### Cadastro

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

#### Login

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

Resposta esperada:

```json
{
  "success": true,
  "message": "Seja Bem-Vindo(a) !",
  "rows": "jwt_token"
}
```

### Agendamentos

Todas as rotas abaixo exigem token JWT no header:

```http
Authorization: Bearer seu_token_jwt
```

#### Criar agendamento

```http
POST /agendamento
```

Body:

```json
{
  "nome": "Consulta",
  "data": "2026-07-20",
  "hora": "14:30:00"
}
```

#### Listar agendamentos do usuario logado

```http
GET /agendamento
```

#### Editar agendamento

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

#### Deletar agendamento

```http
DELETE /agendamento/:id
```

## Pontos De Seguranca Para Melhorar

- Adicionar rate limit em `/auth/login` e `/auth/register`.
- Adicionar `helmet` para headers HTTP de seguranca.
- Validar todas as entradas com uma biblioteca como `zod`, `joi` ou `express-validator`.
- Exigir senha minima e bloquear senhas fracas.
- Normalizar email antes de salvar e consultar: `trim()` e `toLowerCase()`.
- Validar `SECRET_KEY`, variaveis do banco e porta no boot da aplicacao.
- Evitar retornar `error.message` diretamente para o cliente.
- Criar regra clara de expiracao, refresh e revogacao de tokens.
- Configurar CORS por variavel de ambiente em vez de deixar fixo em `localhost`.
- Adicionar constraints no banco para reforcar regras de negocio.

## Melhorias Recomendadas

- Criar scripts no `package.json`, como `start`, `dev` e `test`.
- Corrigir o `.gitignore` para nao ignorar `package.json` e `package-lock.json`.
- Adicionar testes automatizados para cadastro, login e agendamentos.
- Padronizar o formato das respostas da API.
- Criar migrations em vez de depender de scripts SQL soltos.
- Adicionar paginacao na listagem de agendamentos.
- Adicionar status do agendamento: `pendente`, `confirmado`, `cancelado`.
- Criar logs estruturados para facilitar debug e monitoramento.
- Documentar exemplos de erros e codigos HTTP.

## Estado Atual

Funcionalidades ja iniciadas:

- Cadastro de usuario com hash de senha.
- Login com JWT.
- Middleware de autenticacao.
- CRUD basico de agendamentos.
- Conexao com MySQL via pool.

Antes de producao, priorize:

1. Corrigir schema de `agendamentos`.
2. Corrigir fluxo de cadastro para aguardar o INSERT no banco.
3. Definir e reforcar a regra de conflito de horario.
4. Implementar validacao robusta.
5. Adicionar protecoes basicas de seguranca.
6. Criar testes automatizados.

## Licenca

ISC
