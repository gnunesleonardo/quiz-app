const quizAnswerDatabase = require('../database/quiz_answers.json');
const saveDataToJsonDatabase = require('../helpers/saveDatabase');

const getAllAnswers = () => quizAnswerDatabase;

const createAnswer = async (formData) => {
  quizAnswerDatabase.push(formData);
  return await saveDataToJsonDatabase('quiz_answers.json', quizAnswerDatabase);
}

module.exports = {
  getAllAnswers,
  createAnswer
}