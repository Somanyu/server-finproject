const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/user', verifyToken, async (req, res, next) => {
    const userId = req.user;
    const user = await User.findById(userId, "-password");
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    return res.status(201).json({user});
});

module.exports = router;