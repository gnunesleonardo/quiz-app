const service = require('../services/answer')
const resolver = require('../resolvers/answer');

const getAnswer = async ({ query }, res) => {
  const { quizId } = query;

  const quizData = quizId ? service.getAnswerByQuizId(quizId) : service.getAllAnswers();
  const { status, json } = resolver.listedAnswer(quizData);

  return res.status(status).json(json);
};

const createAnswer = async ({ body }, res) => {
  const formData = body;

  const isValid = service.validateAnswerFormData(formData);
  if(isValid) {
    const answerData = await service.createAnswer(formData);

    var { status, json } = resolver.createdAnswer(answerData);
  } else {
    var { status, json } = resolver.invalidBody();
  }

  return res.status(status).json(json);
};

module.exports = {
  getAnswer,
  createAnswer
}