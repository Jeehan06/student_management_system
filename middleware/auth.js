const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretkey";

function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Access denied. No token provided."
        });

    }

    try {

        const user = jwt.verify(token, JWT_SECRET);

        req.user = user;

        next();

    } catch (err) {

        res.status(403).json({
            message: "Invalid token."
        });

    }

}

module.exports = authenticateToken;