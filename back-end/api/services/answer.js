const repository = require('../repositories/answer');

const validateAnswerFormData = (formData) => {
  return Object(formData).hasOwnProperty('quiz_id') &&
    Object(formData).hasOwnProperty('answer_author') &&
    Object(formData).hasOwnProperty('creation_date') &&
    Object(formData).hasOwnProperty('quiz_answers') 
    ? true : false;
};

const getAllAnswers = () => repository.getAllAnswers();

const getAnswerByQuizId = (quizId) => {
  const quizData = repository.getAllAnswers();
  return quizData.filter((data) => data.quiz_id == quizId);
};

const createAnswer = async (formData) => {
  const answerData = repository.getAllAnswers();
  formData.answer_id = answerData.length + 1;
  
  const created = await repository.createAnswer(formData);

  return created ? formData : null;
}

module.exports = {
  getAllAnswers,
  getAnswerByQuizId,
  createAnswer,
  validateAnswerFormData
}