const express = require('express');
const router = express.Router();
const { verifyToken, refreshToken } = require('../middlewares/authMiddleware');
const messageController = require('../controller/messageController');

router.get('/verify', verifyToken, messageController.verifyUserNumber);

module.exports = router;