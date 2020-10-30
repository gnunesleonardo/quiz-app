const {
  OK, INTERNAL_SERVER_ERROR, BAD_REQUEST
} = require('http-status-codes');

const listedAnswer = (answerData) => {
  return {
    status: answerData ? OK : INTERNAL_SERVER_ERROR,
    json: {
      data: answerData,
      message: answerData ? 'Resposta(s) listados com sucesso' : 'Erro ao listar resposta(s)'
    }
  }
}

const createdAnswer = (answerData) => {
  return {
    status: answerData ? OK : INTERNAL_SERVER_ERROR,
    json: {
      data: answerData || null,
      message: answerData ? 'Resposta criado com sucesso' : 'Erro ao criar resposta'
    }
  }
};

const invalidBody = () => {
  return {
    status: BAD_REQUEST,
    json: {
      message: 'Body da requisição inválido'
    }
  }
}

module.exports = {
  listedAnswer,
  createdAnswer,
  invalidBody
}