// Checks JWT token for authentication
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // handles "Bearer token"
    if (!token) { // Check if token is provided
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { // Check if token is valid
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; // example: { id, role }
        next(); // Token is valid, proceed to next middleware or route handler
    });
}

module.exports = authMiddleware; // Checks JWT token for authentication