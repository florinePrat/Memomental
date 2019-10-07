
const express = require('express');

const router = express.Router();
router.get('/getLabelsByUser', require('./getLabelsByUser'));

module.exports = router;
