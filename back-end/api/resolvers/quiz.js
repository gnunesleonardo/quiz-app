const {
  OK, INTERNAL_SERVER_ERROR, BAD_REQUEST
} = require('http-status-codes');

const listedQuiz = (quizData) => {
  return {
    status: quizData.length ? OK : INTERNAL_SERVER_ERROR,
    json: {
      data: quizData.length ? quizData : [],
      message: quizData.length ? 'Questionário(s) listados com sucesso' : 'Erro ao listar questionário(s)'
    }
  }
}

const createdQuiz = (quizData) => {
  return {
    status: quizData ? OK : INTERNAL_SERVER_ERROR,
    json: {
      data: quizData || null,
      message: quizData ? 'Questionário criado com sucesso' : 'Erro ao criar questinário'
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
  listedQuiz,
  createdQuiz,
  invalidBody
}