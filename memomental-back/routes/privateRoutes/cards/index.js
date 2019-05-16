
const express = require('express');

const router = express.Router();
router.post('/add', require('./addCard'));
router.put('/edit',require('./editCard'));
router.post('/answer',require('./answer'));
router.get('/getCardsByUser', require('./getCardsByUser'));
router.get('/today', require('./getTodayUserCards'));
router.delete('/:idCard', require('./deleteCard'));

module.exports = router;
