const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const quizRoutes = require('./routes/quiz');
const answerRoutes = require('./routes/answer');

const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(quizRoutes);
app.use(answerRoutes);

module.exports = app;