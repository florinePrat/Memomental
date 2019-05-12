
const express = require('express');

const router = express.Router();
router.post('/add', require('./addCard'));
router.get('/getCardsByUser', require('./getCardsByUser'));
module.exports = router;
