exports.signUp = async (req, res) => {
    try {
        const fullName = req.body.fullName
        console.log("🚀 ~ file: authController.js:3 ~ exports.signUp= ~ fullName:", fullName)
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
    
        return res.status(201).send({ success: '✅ Signed up successfully' })
    } catch (error) {
        res.status(500).send({ message: "❌ Internal server error" })
    }
}