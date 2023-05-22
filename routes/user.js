const express = require('express');
const router = express.Router();
const { verifyToken, refreshToken } = require('../middlewares/authMiddleware');
const userController = require('../controller/userController');

router.get('/user', verifyToken, userController.getUser);
router.get('/refresh', refreshToken, verifyToken, userController.getUser);

module.exports = router;