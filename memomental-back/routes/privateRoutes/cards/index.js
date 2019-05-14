
const express = require('express');

const router = express.Router();
router.post('/add', require('./addCard'));
router.post('/edit',require('./editCard'));
router.post('/answer',require('./answer'));
router.get('/getCardsByUser', require('./getCardsByUser'));

module.exports = router;
