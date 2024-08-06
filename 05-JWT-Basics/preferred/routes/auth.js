const express = require('express');
const { logon, hello } = require('../controllers/authController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/logon', logon);
router.get('/hello', authenticate, hello);

module.exports = router;