const userModel = require('../Model/userModel')

exports.getDashboard = (req, res) => {
  res.json({ message: 'Admin Dashboard', user: req.user })
}

exports.manageUsers = (req, res) => {
  res.json({ message: 'Manage Users - Admin Only' })
}

// GET /api/admin/list - Admin only: list customers (moved from customerController)
exports.listCustomers = async (req, res) => {
  try {
    const customers = await userModel.listUsersByRole('customer')
    // Normalize shape for frontend
    const data = customers.map((u) => ({
      id: String(u.id),
      firstname: u.firstname || '',
      lastname: u.lastname || '',
      email: u.username, // username is email
      contact: u.contact || '',
    }))
    res.json({ customers: data })
  } catch (e) {
    console.error('List Customers Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}
