const express = require('express');
const Controller = require('../controllers/quiz');

const router = express.Router();

router.route('/api/quiz').get(Controller.getQuiz);

router.route('/api/quiz').post(Controller.createQuiz);

module.exports = router;