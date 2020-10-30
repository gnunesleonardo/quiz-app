# quiz-app

Implementação de sistema web para cadastro de questionários, como teste técnico para vaga de Desenvolvedor Full Stack na **[Agrotools](https://agrotools.com.br/)**

Demonstração: https://gnunesleonardo.github.io/quiz-app/front-end/index.html

## Requisitos do sistema

##### Construir um sistema web responsivo, que deverá:
- Criar questionário (Visto que cada usuário pode configurar um ou mais questionários para serem respondidos);
- Responder um questionário;

##### Telas:
- Ao clicar sobre o questionário respondido, listar as respectivas perguntas e respostas realizadas;
- Tela de responder questionário;
- Tela de criar um questionário;

## Tecnologias utilizadas

##### Front-end
- [Bootstrap](https://getbootstrap.com/) para estilização e responsividade da página;
- [jQuery](https://jquery.com/) para manipulação do HTML;

##### Back-end
- [Express](https://expressjs.com/) (Node.js) para criação do servidor API REST;

## Requisitos

- [Node.js](https://nodejs.org/);
- [live-server](https://www.npmjs.com/package/live-server);
  ```sh
  npm install -g live-server
  ```

## Subindo sistema web

Instruções para execução do projeto:

### copiando o projeto

1. **clone o repositório:**
  ```sh
  $ git clone https://github.com/gnunesleonardo/quiz-app.git
  ```

2. **executando back-end:**

  na pasta raiz do back-end `(quiz-app/back-end)`, executar:

  ```sh
  $ npm install
  ```
  em seguida:
  ```sh
  $ npm start
  ```

3. **executando front-end:**
  na pasta raiz do front-end `(quiz-app/front-end)`, executar:

  ```sh
  $ live-server
  ```

## Endpoints disponíveis

esta seção tem como objetivo explicitar cada endpoint do projeto.

### 1. GET /api/quiz

Obtem lista de todos os questionários cadastrados

**exemplo:**

- requisição:
  > `GET /api/quiz`

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
    "data": [
      {
        "quiz_id": 1,
        "quiz_title": "Lorem Ipsum",
        "quiz_author": "Leonardo Gomes Nunes",
        "creation_date": "2020-10-29",
        "quiz_questions": [
          "Nunc consequat facilisis risus vitae facilisis",
          "Vivamus est lacus, blandit sit amet ex nec, ultrices viverra justo",
          "Fusce aliquet et diam sit amet pulvinar"
        ]
      },
      {
        "quiz_id": 2,
        "quiz_title": "Sed quis",
        "quiz_author": "Leonardo Gomes Nunes",
        "creation_date": "2020-10-30",
        "quiz_questions": [
          "Est lacus, blandit si",
          "Suscipit pellentesque eros"
        ]
      }
    ],
    "message": "Questionário(s) listados com sucesso"
  }
  ```

### 2. GET /api/quiz

Obtem questionário cadastrado de acordo com seu `quiz_id`

**obrigatório:** requisição deve conter query string `quizId`

**exemplo:**

- requisição:
  > `GET /api/quiz?quizId=xxxx`

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
    "data": [
      {
        "quiz_id": "2",
        "quiz_title": "Etiam euismod",
        "quiz_author": "Larissa Vancini",
        "creation_date": "1997-01-07",
        "quiz_questions": [
          "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
          "Duis ultricies vulputate magna, sed placerat turpis consectetur in. Etiam.",
          "Fusce vitae vehicula ante. Ut commodo tellus a ultricies sollicitudin.",
          "Curabitur nec augue at est euismod consequat nec ac erat."
        ]
      }
    ],
    "message": "Questionário(s) listados com sucesso"
  }
  ```

### 3. GET /api/answer

Obtem lista de todas as respostas cadastrados

**exemplo:**

- requisição:
  > `GET /api/answer`

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
    "data": [
      {
        "answer_id": 1,
        "quiz_id": 1,
        "answer_author": "Leonardo Gomes Nunes",
        "creation_date": "2020-10-29",
        "quiz_answers": [
          "Curabitur non justo mi",
          "Praesent dui ex, faucibus eu lectus eu, suscipit pellentesque eros",
          "Donec consectetur aliquet justo"
        ]
      },
      {
        "answer_id": 2,
        "quiz_id": 2,
        "answer_author": "Porter Robinson",
        "creation_date": "2020-10-29",
        "quiz_answers": [
          "Faucibus eu lectus eu",
          "Cras imperdiet vitae",
          "Praesent dui ex"
        ]
      }
    ],
    "message": "Resposta(s) listados com sucesso"
  }
  ```

### 4. GET /api/answer

Obtem resposta cadastrada de acordo o `quiz_id` de determinado questionário

**obrigatório:** requisição deve conter query string `quizId`

**exemplo:**

- requisição:
  > `GET /api/answer?quizId=xxxx`

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
    "data": [
      {
        "answer_id": 1,
        "quiz_id": 1,
        "answer_author": "Leonardo Gomes Nunes",
        "creation_date": "2020-10-29",
        "quiz_answers": [
          "Curabitur non justo mi",
          "Praesent dui ex, faucibus eu lectus eu, suscipit pellentesque eros",
          "Donec consectetur aliquet justo"
        ]
      }
    ],
    "message": "Resposta(s) listados com sucesso"
  }
  ```

### 5. POST /api/quiz

Realiza o cadastro de um novo questionário

**exemplo:**

- requisição:
  > `POST /api/quiz`

  ```json
  Content-Type: application/json

  {
    "quiz_title": "Sed quis",
    "quiz_author": "Leonardo Gomes Nunes",
    "creation_date": "2020-10-30",
    "quiz_questions": [
      "Est lacus, blandit si",
      "Suscipit pellentesque eros"
    ]
  }
  ```

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
    "data": {
      "quiz_id": 2,
      "quiz_title": "Sed quis",
      "quiz_author": "Leonardo Gomes Nunes",
      "creation_date": "2020-10-30",
      "quiz_questions": [
        "Est lacus, blandit si",
        "Suscipit pellentesque eros"
      ]
    },
    "message": "Questionário criado com sucesso"
  }
  ```

### 5. POST /api/quiz

Realiza o cadastro de uma nova resposta

**exemplo:**

- requisição:
  > `POST /api/quiz`

  ```json
  Content-Type: application/json

  {
    "quiz_id": 2,
    "answer_author": "DJ Potaro",
    "creation_date": "2020-10-30",
    "quiz_answers": [
      "Nunc consequat",
      "Faucibus eu lectus"
    ]
  }
  ```

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
    "data": {
      "answer_id":3,
      "quiz_id": 2,
      "answer_author": "DJ Potaro",
      "creation_date": "2020-10-30",
      "quiz_answers": [
        "Nunc consequat",
        "Faucibus eu lectus"
      ]
    },
    "message":"Resposta criado com sucesso"
  }
  ```