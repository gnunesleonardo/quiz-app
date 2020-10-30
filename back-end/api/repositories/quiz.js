const quizDatabase = require('../database/quiz_data.json');
const saveDataToJsonDatabase = require('../helpers/saveDatabase');

const getAllQuizzes = () => quizDatabase;

const createQuiz = async (formData) => {
  quizDatabase.push(formData);
  return await saveDataToJsonDatabase('quiz_data.json', quizDatabase);
};

module.exports = {
  getAllQuizzes,
  createQuiz
}