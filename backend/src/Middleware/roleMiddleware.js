// Role check middleware - needed for routes where users can act on other people’s data or perform restricted actions.
function roleMiddleware(requiredRole) {
    return (req, res, next) => {
        if (!req.user) { // Check if user is authenticated
            return res.status(401).json({ message: 'Not authenticated' });
        }
        if (req.user.role !== requiredRole) { // Check if user has the required role
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        next(); // User has the required role, proceed to next middleware or route handler
    };
}

module.exports = roleMiddleware;