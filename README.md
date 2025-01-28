# Petshop API

Esta é uma API REST desenvolvida para gerenciar um petshop e seus pets. A aplicação foi criada utilizando **Express**, **Prisma** e **Docker**, com um banco de dados PostgreSQL hospedado em um contêiner Docker.

## Funcionalidades

### Operações de Petshop:
- **GET /petshops**: Retorna a lista de todos os petshops cadastrados.
- **POST /petshops**: Cria um novo petshop.

### Operações de Pet:
- **GET /pets**: Retorna a lista de todos os pets cadastrados.
- **POST /pets**: Cria um novo pet.
- **PUT /pets/:id**: Atualiza nome, tipo, descrição e data de vacinação de um pet com base no seu ID.
- **PATCH /pets/:id**: Atualiza os dados de vacinação do pet com base no ID.
- **DELETE /pets/:id**: Remove um pet com base no seu ID.

## Tecnologias Utilizadas
- **Node.js**: Para a criação do servidor.
- **Express**: Framework para construir as rotas e a estrutura REST da API.
- **Prisma**: ORM para interação com o banco de dados PostgreSQL.
- **Docker**: Para gerenciar o contêiner do banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados utilizado para armazenar as informações do petshop e dos pets.

## Requisitos

- **Node.js** (v16 ou superior)
- **npm** (v8 ou superior)
- **Docker** e **Docker Compose**

## Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/caua-3301/petshop-application-prisma.git
   cd petshop-application-prisma
   ```

2. Inicie a aplicação utilizando o seguinte comando:
   ```bash
   npm start
   ```

   Este comando irá executar os seguintes passos:
   - Instalar as dependências com `npm install`.
   - Iniciar os contêineres Docker com `docker-compose up`.
   - Executar o servidor Node.js.

3. A aplicação estará rodando em `http://localhost:5500`.

## Endpoints

### Petshop
- **GET /petshops**: Retorna todos os petshops.
- **POST /petshops**: Cria um novo petshop.

### Pet
- **GET /pets**: Retorna todos os pets.
- **POST /pets**: Cria um novo pet.
- **PUT /pets/:id**: Atualiza os dados de um pet.
- **PATCH /pets/:id**: Atualiza dados parciais de um pet.
- **DELETE /pets/:id**: Exclui um pet pelo ID.

## Banco de Dados

O banco de dados PostgreSQL é configurado com o Prisma. O arquivo `schema.prisma` define os modelos e relações necessários para a aplicação.

### Modelo de Petshop
```prisma
model Petshop {
  id   String @id @default(uuid())
  name String
  cnpj String @unique
  pets Pet[]  @relation("petshop_have_pets_table")

  @@map("petshop_table")
}
```

### Modelo de Pet
```prisma
model Pet {
  id                   String    @id @default(uuid())
  name                 String
  type                 String
  description          String
  vaccinated           Boolean   @default(false)
  deadline_vaccination DateTime
  created_at           DateTime  @default(now())
  petshops             Petshop[] @relation("petshop_have_pets_table")

  @@map("pet_table")
}

```

## Docker

O arquivo `docker-compose.yml` gerencia o contêiner do PostgreSQL. Certifique-se de que o Docker está instalado e em execução antes de iniciar a aplicação.
