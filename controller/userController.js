const User = require('../models/User');

exports.getUser = async (req, res, next) => {
    const userId = req.user;
    const user = await User.findById(userId, "-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(201).json({ user });
}

exports.userUpdate = async (req, res, next) => {
    try {
        const { fullName, email, phone } = req.body;

        const userId = req.user;

        const user = await User.findByIdAndUpdate(userId, { fullName, email, phone }, { new: true });

        if (!user) return res.status(404).json({ error: "User not found" });

        return res.status(201).json({ 'success': 'Profile updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: "❌ Internal server error" });
    }
}


