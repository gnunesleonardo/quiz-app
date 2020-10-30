const repository = require('../repositories/quiz');

const validateQuizFormData = (formData) => {
  return Object(formData).hasOwnProperty('quiz_title') &&
    Object(formData).hasOwnProperty('quiz_author') &&
    Object(formData).hasOwnProperty('creation_date') &&
    Object(formData).hasOwnProperty('quiz_questions') 
    ? true : false;
};

const getAllQuizzes = () => repository.getAllQuizzes();

const getQuizById = (quizId) => {
  const quizData = repository.getAllQuizzes();
  return quizData.filter((data) => data.quiz_id == quizId);
};

const createQuiz = async (formData) => {
  const quizData = repository.getAllQuizzes();
  formData.quiz_id = quizData.length + 1;
  
  const created = await repository.createQuiz(formData);

  return created ? formData : null;
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  validateQuizFormData,
}