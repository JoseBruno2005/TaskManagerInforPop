# TaskManagerInforPop

Este projeto é uma aplicação completa de gerenciamento de tarefas, composta por uma API REST robusta em Java/Spring Boot e um Front-end moderno em Angular com Tailwind CSS. O sistema conta com autenticação JWT e controle de acesso por perfis (Admin e User).

## Backend
API REST desenvolvida com Java 17 e Spring Boot para o gerenciamento eficiente de tarefas e usuários.

### Tecnologias Principais

Java 17 & Spring Boot 3.4.1.

Spring Security & JWT: Autenticação e controle de acesso.

Spring Data JPA & PostgreSQL: Persistência robusta de dados.

Docker: Containerização completa da aplicação e banco de dados.

Swagger/OpenAPI: Documentação interativa dos endpoints.

### Estrutura do Projeto
O backend está organizado seguindo padrões de separação de responsabilidades em módulos:

com.inforpop.taskmanager
```
  ├── config              Configurações de segurança e Beans
  ├── exceptions          Tratamento global de exceções
  ├── filters             Filtros de segurança (JWT)
  └── modules             Módulos principais do domínio
      ├── auth            Login e geração de tokens
      ├── task            Gerenciamento de tarefas
          ├── controllers     Endpoints da API
          ├── domain          Entidades JPA
          ├── dto             Objetos de Transferência de Dados
            ├── request
            ├── response
            └── mapper
          ├── repository          Interfaces de acesso ao banco
          └── services            Regras de negócio
      └── user            Gerenciamento de usuários
```

## Frontend
Este projeto foi gerado utilizando Angular, TypeScript e Tailwind.

### Estrutura de Pastas
A organização segue o padrão Core/Domain/Shared para escalabilidade:

```
src/app
├── core                # Configurações globais (env, layout, style)
├── domain              # Páginas e rotas por perfil (admin, authenticated, public)
└── shared              # Recursos reutilizáveis
    ├── components      # Componentes UI (Toast, Logo, Header)
    ├── guards          # Proteção de rotas
    ├── interceptors    # Interceptação de requisições HTTP
    ├── services        # Comunicação com API e lógica compartilhada
    ├── types           # Definições de interfaces e modelos
    └── utils           # Funções utilitárias
```

### Desenvolvimento e Execução

#### Como Rodar o Projeto
```
Pré-requisitos
Docker e Docker Compose instalados.
Node.js e Angular CLI instalados (para rodar o front localmente).
```

1. Configuração do Ambiente
   
Na raiz do diretório /backend, crie um arquivo .env com as seguintes variáveis:

```
POSTGRES_DB=tasks
POSTGRES_USER=user_task
POSTGRES_PASSWORD=task_password
DB_HOST=db
DB_PORT=5432
DB_NAME=tasks
DB_USER=user_task
DB_PASSWORD=task_password
TOKEN_SECRET_KEY=sua_chave_secreta
```
2. Rodando o Backend (Docker)
Para subir o banco de dados e a API simultaneamente acesse a pasta /backend e execute:

```bash
docker-compose up --build
```

A API estará disponível em http://localhost:8080.

Endpoints da API
Documentação disponível via Swagger em http://localhost:8080/swagger-ui/index.html.

```
Auth: /auth/login (POST).

Users: /users/register (POST), /users (GET), /users/{id} (GET).

Tasks: CRUD completo em /task com suporte a filtros e soft delete.
```

3. Rodando o Frontend
Acesse a pasta /frontend e execute:

```bash
# Instalar dependências
npm install

# Iniciar aplicação
ng serve
```
O sistema abrirá em http://localhost:4200

### Funcionalidades e Regras de Negócio
```
Autenticação: Acesso protegido por Token JWT.
Controle de Acesso:

ADMIN: Pode cadastrar, editar, excluir e listar todas as tarefas.

USER: Pode visualizar as tarefas atribuídas.

Soft Delete: A remoção de tarefas não as exclui fisicamente do banco de dados, apenas as marca como deletadas.

Filtros: É possível realizar buscas por título e filtrar por status (PENDING, DOING, DONE).

Tratamento de Erros: Erros de validação, conflitos de recurso e falhas de negócio são capturados globalmente e retornados em um formato padronizado.
```
