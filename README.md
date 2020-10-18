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
- **Deletar Produto** 

**`DELETE /product/delete/:id`** A rota recebe via _path variable_ o `id` do produto que será deletado. Há verificação do tipo de perfil de quem está executando a ação de remoção do produto, se há token válido e se o produto que será deletado existe. 

- **Atualizar Produto**

**`PUT /product/edit/:id`** A rota recebe em seu corpo até três informações que podem ser atualizadas (as mesmas da criação do produto). O `id`do product que será editado é recebido via  _path variable_. Não é necessário colocar todas informações na requisição. Por exemplo, se há intenção de atualizar apenas o `name` do produto, não é necessário colocar a `category` do mesmo. Para melhor organização da API, a edição de cada informação do produto é tratada por um serviço independente na camada `business`. Dessa forma, as linhas extras de código no backend poupadas no frontend e mobile pela flexibilidade que gera, além de contribuir para uma UI mais fluida.


Exemplo de requisição: 

```
{
    "name": "iphone 13",
    "category": "toy",
}
```

- **Buscar todos Produtos**

**`GET /product/all/?limit= &skip= `** A rota recebe através do _query params_ o limite de produtos que serão buscados e a partir de qual através de `limit` e `skip` respectivamente para gerar a paginação. Esta rota busca todos produtos, inclusive os que não estão disponívels. (`quantity` igual a zero). Há verificação de token e `role` para realizar esta busca. 


Exemplo de resposta: 

```
{
    "products": [
        {
            "_id": "5f89b184e3ae302e58e9758c",
            "name": "iphone",
            "category": "electronic",
            "price": 20000,
            "quantity": 0
            "__v": 0
        },
        {
            "_id": "5f89b1bf5a559825647afab6",
            "name": "samsung",
            "category": "electronic",
            "price": 20000,
            "quantity": 10
            "__v": 0
        }
    ],
    "total": 2
}
```
- **Buscar todos Produtos Disponíveis**

**`GET /product/all/?limit= &skip= `** A rota recebe através do _query params_ o limite de produtos que serão buscados e a partir de qual através de `limit` e `skip` respectivamente para gerar a paginação. Esta rota busca todos produtos disponíveis (`quantity` maior ou igual a um). Há verificação de token e `role` para realizar esta busca. 


```
{
    "products": [
        {
            "quantity": 2,
            "_id": "5f8b6cc688c7edaaf4aa76b1",
            "name": "pula pirata",
            "category": "toy",
            "price": 20060,
            "__v": 0
        },
        {
            "quantity": 10,
            "_id": "5f8b9aa462b0196ffca90052",
            "name": "barbie girl",
            "category": "toy",
            "price": 20060,
            "__v": 0
        }
    ],
    "total": 2
}
```

- **Busca de produto por nome**

**`GET /product/filter/?name= &limit= &skip= `** A rota recebe através do _query params_ o nome do produto que está buscando, o limite de produtos que serão buscados e a partir de qual através de `limit` e `skip` respectivamente para gerar a paginação. Há verificação de token e `role` para realizar esta busca.

**Termo de busca: iPhone**

Exemplo de Resposta: 

```
[
    {
        "quantity": 10,
        "_id": "5f8b9acb62b0196ffca90053",
        "name": "iphone 12",
        "category": "electronic",
        "price": 10500,
        "__v": 0
    },
    {
        "quantity": 10,
        "_id": "5f8bc673dc4aa6b56412b504",
        "name": "iphone 14",
        "category": "electronic",
        "price": 10500,
        "__v": 0
    },
    {
        "quantity": 200,
        "_id": "5f8bc6f4d1ae7aad948f0d39",
        "name": "iphone 15",
        "category": "electronic",
        "price": 10500,
        "__v": 0
    }
]
```

- **Visualização de produto pelo cliente**

**`GET /product/detail/:id`**  A rota recebe através do _path variable_ o id do produto que está buscando para visualizar os detalhes do mesmo. Há verificação de token e `role` (apenas o cliente) para realizar esta busca.

```
[
    {
        "quantity": 10,
        "_id": "5f8b9acb62b0196ffca90053",
        "name": "iphone 12",
        "category": "electronic",
        "price": 10500,
        "__v": 0
    }
```
#### 👋🏽 Contato

Lourenço Passos | Desenvolvedor Web Fullstack | lo.passos93@gmail.com | 51-996106010





