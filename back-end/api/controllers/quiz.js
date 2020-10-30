const service = require('../services/quiz')
const resolver = require('../resolvers/quiz');

const getQuiz = async ({ query }, res) => {
  const { quizId } = query;

  const quizData = quizId ? service.getQuizById(quizId) : service.getAllQuizzes();
  const { status, json } = resolver.listedQuiz(quizData);

  return res.status(status).json(json);
};

const createQuiz = async ({ body }, res) => {
  const formData = body;

  const isValid = service.validateQuizFormData(formData);
  if(isValid) {
    const quizData = await service.createQuiz(formData);

    var { status, json } = resolver.createdQuiz(quizData);
  } else {
    var { status, json } = resolver.invalidBody();
  }

  return res.status(status).json(json);
};

module.exports = {
  getQuiz,
  createQuiz
}