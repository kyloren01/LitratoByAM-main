// Role check middleware - needed for routes where users can act on other people’s data or perform restricted actions.
function roleMiddleware(required) {
    const roles = Array.isArray(required) ? required : [required];
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        next();
    };
}

module.exports = roleMiddleware;