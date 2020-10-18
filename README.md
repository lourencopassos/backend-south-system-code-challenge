# ⌛️ API Rest Node - Desafio Técnico Backend

### Repositório do desafio técnico para desenvolvedor de Node.Js na empresa: South System. Para saber mais sobre o escopo do desafio, [clique aqui](https://github.com/rh-southsystem/desafio-node-loja).

<br>

----

<br>

## 🚀 Características do desafio
- API padrão REST
- Utilização de Node.js
- Utilização de banco de dados NoSQL
- Deploy da aplicação em Heroku, Firebase...

## 👨🏽‍💻 Tecnologias utilizadas
- Node.js
- Typescript
- Mongo DB Atlas
- Mongoose
- Express
- JwtToken
- Bcrypt
- Jest
- Postman para teste da API

## 📝 Requisitos funcionais
Para uma visão completa das user stories do desafio, [clique aqui](https://github.com/rh-southsystem/desafio-node-loja).

## 🚙 Instruções para rodar a aplicação
A aplicação foi disponibilizada utilizando o Heroku, mas caso queria rodar localmente:

1. `npm install` para instalar todas as dependências;
3. `npm test` para rodar os testes do projeto;
3. `npm run local` para rodar localmente o projeto.

## 🔑 Acessos

```
Gerente: 

username: manager
password: south

```
```
Cliente: 

username: client
password: south

```

## 🛤 Rotas da Aplicação
- Na API desenvolvida há rotas públicas e protegidas.
- Nas protegidas, há a necessidade de usar o header "Authorization:" token.
- O token tem duração de 90 minutos.
- Além de autenticação que verifica se o usuário está logado, no token é passado tipo de perfil (role) conectado. O role dita o tipo de liberação que o usuário terá para executar ações na aplicação.

URL base da API: xxxx

### 🔓 Rotas Públicas

<br>

- **Criação de usuário**

**`POST /user/signup`** A rota deve receber um `username`, `password` e `role` dentro do corpo da requisição, sendo o `role` do tipo `manager` para gerentes que tem uma liberação de ações administrativas na aplicação ou `client`, para visualização de detalhes de um determinado produto. O `password` então é encriptado utilizando o `bcrypt` antes de ser gravado no banco de dados. A resposta deste endpoint é já a geração de token, para facilitar o login pós cadastro.

Exemplo de requisição:

```
{
  "username": "manager",
  "password": "south",
  "role": "manager"
}
```
- **Login de usuário**

**`POST /user/login`** A rota deve receber um `username`, `password` no corpo da requisição para a geração de token, que carrega o a liberação do usuário dentro da aplicação. A resposta deste é endpoint é o token.

Exemplo de requisição:

```
{
  "username": "manager",
  "password": "south",
}
```

Exemplo de resposta:

``` 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjAyOTg5ODk0LCJleH..."
}
```

### 🔐 Rotas Privadas

<br>

- **Criação de Produto** 

**`POST /product/create`** A rota deve receber um `name`, `category`, sendo as categorias possíveis `toy`, `electronic` e `apparel`, `price` e `quantity`. A quantidade do mesmo produto dita se este está disponível na loja. A quantidade e preço devem ser enviadas como número. É possível enviar com centavos o preço, mas há uma conversão na hora do envio ao banco. Não é possível criar um produto com o nome de um que já exista na loja.

Exemplo de requisição: 

```
{
    "name": "iphone 12",
    "category": "electronic",
    "price": 105,
    "quantity": 10
}
```









