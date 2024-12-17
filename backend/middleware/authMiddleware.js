const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token data (user info) to the request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticate;
