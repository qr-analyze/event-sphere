const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        // Decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired, please log in again." });
        }
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authenticate;
