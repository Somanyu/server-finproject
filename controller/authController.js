const User = require("../models/User");
const { userRegisterValidation, userLoginValidation } = require("../services/validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try {

        const { fullName, email, phone, password } = req.body;

        // Server side validation for user input during registration.
        const { error } = userRegisterValidation(req.body);
        if (error) return res.status(403).send({ error: error.details[0].message });

        // Check if email is exists in Collection.
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(403).send({ error: "Email already exists." });

        // Hash incoming password with "bcryptjs".
        const salt = await bcrypt.genSalt(10); // generates a salt
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const userData = new User({
                fullName: fullName,
                email: email,
                phone: phone,
                password: hashedPassword,
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



exports.signIn = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // Server side validation for user input during login.
        const { error } = userLoginValidation(req.body);
        if (error) return res.status(403).send({ error: error.details[0].message });

        // Check if email is exists in Collection.
        const user = await User.findOne({ email });
        if (!user) return res.status(403).send({ error: "Email not found. You can register!" });

        // Check if password is correct.
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(403).send({ error: "Invalid email or password!" });

        // Generate JWT Token.
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "12h",
        });

        // Set cookie.
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     maxAge: 1000 * 60 * 60 * 24 * 7,
        //     sameSite: 'lax',
        //     secure: true,
        // });

        return res.status(201).send({ success: "Signed in successfully.", token });
    } catch (error) {
        console.log("🚀 ~ file: authController.js:57 ~ exports.signIn= ~ error:", error)
        res.status(500).send({ error: "❌ Internal server error" })
    }
}
