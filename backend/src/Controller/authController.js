const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

exports.register = async (req, res) => {
    try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthdate,
      sex,
      contact,
      region,
      province,
      city,
      barangay,
      postal_code,
    } = req.body;

        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check if user exists
        const existingUser = await userModel.findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user (role is required, set to 'customer')
    const user = await userModel.createUser(
      username,
      hashedPassword,
      "customer",
      firstname,
      lastname,
      birthdate,
      sex,
      contact,
      region,
      province,
      city,
      barangay,
      postal_code
    );

        res.status(201).json({ message: "Registration successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};



exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findUserByUsername(username);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: `Bearer ${token}`,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    let url = "/";
    if (user.role === "admin") url = "/admin/dashboard";
    else if (user.role === "employee") url = "/employee/dashboard";
    else if (user.role === "customer") url = "/customer/dashboard";

    return res.json({
      username: user.username,
      email: user.username, // using username as email for this schema
      role: user.role,
      url,
      region: user.region,
      province: user.province,
      city: user.city,
      barangay: user.barangay,
      postal_code: user.postal_code,
      contact: user.contact,
      firstname: user.firstname,
      lastname: user.lastname,
      birthdate: user.birthdate,
      sex: user.sex,
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update current user's profile
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const allowed = [
      'firstname',
      'lastname',
      'birthdate',
      'sex',
      'contact',
      'region',
      'province',
      'city',
      'barangay',
      'postal_code',
    ];

    const payload = {};
    for (const key of allowed) {
      if (key in req.body) payload[key] = req.body[key];
    }

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: 'No updatable fields provided' });
    }

    const updated = await userModel.updateUserProfile(userId, payload);
    return res.json({ message: 'Profile updated', user: updated });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
