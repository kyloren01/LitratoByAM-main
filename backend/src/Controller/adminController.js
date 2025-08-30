exports.getDashboard = (req, res) => {
    res.json({ message: 'Admin Dashboard', user: req.user });
};

exports.manageUsers = (req, res) => {
    res.json({ message: 'Manage Users - Admin Only' });
};