const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    // Retrieve Bearer token
    const headers = req.headers[`authorization`];
    if (headers) {
        const token = headers.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
                if (error) return res.status(401).json({ error: "1. Invalid Token" });
                // console.log(user._id);
                req.user = user._id; // Id of the user who has logged in.
                next();
            });
        } catch (error) {
            return res.status(401).json({ error: "2. Invalid Token" });
        }
    } else {
        return res.status(401).json({ error: "No Token Provided" });
    }
}

module.exports = { verifyToken };