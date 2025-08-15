exports.getDashboard = (req, res) => {
    res.json({ message: 'Employee Dashboard', user: req.user });
};

exports.handleOrders = (req, res) => {
    res.json({ message: 'Handle Orders - Employee Only' });
};