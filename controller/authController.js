const User = require("../models/User");
const { userRegisterValidation } = require("../services/validator");

exports.signUp = async (req, res) => {
    try {

        const { fullName, email, phone, password } = req.body;

        // Server side validation for user input during registration.
        const { error } = userRegisterValidation(req.body);
        if (error) return res.status(403).send({ error: error.details[0].message });

        // Check if email is exists in Collection.
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(403).send({ error: "Email already exists" });


        try {
            const userData = new User({
                fullName: fullName,
                email: email,
                phone: phone,
                password: password,
            });

            await userData.save();

            return res.status(201).send({ success: 'Sign up successfully. You can sign in.' })
        } catch (error) {
            return res.status(500).send({ success: 'Sign up unsuccessfully' })
        }
    } catch (error) {
        console.log("🚀 ~ file: authController.js:20 ~ exports.signUp= ~ error:", error)
        res.status(500).send({ error: "❌ Internal server error" })
    }
}