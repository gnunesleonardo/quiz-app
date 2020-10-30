const express = require('express');
const Controller = require('../controllers/answer');

const router = express.Router();

router.route('/api/answer').get(Controller.getAnswer);

router.route('/api/answer').post(Controller.createAnswer);

module.exports = router;