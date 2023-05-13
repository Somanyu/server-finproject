const User = require("../models/User");

exports.signUp = async (req, res) => {
    try {

        const { fullName, email, phone, password } = req.body;
        // console.log("🚀 ~ file: authController.js:5 ~ exports.signUp= ~ req.body:", req.body)
        
        const userData = new User({
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
        });

        await userData.save();

        return res.status(201).send({ success: '✅ Signed up successfully' })
    } catch (error) {
        console.log("🚀 ~ file: authController.js:20 ~ exports.signUp= ~ error:", error)
        res.status(500).send({ message: "❌ Internal server error" })
    }
}