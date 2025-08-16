const userModel = require('../Model/userModel');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const {
            username,
            password,
            firstname,
            lastname,
            birthdate,
            sex,
            address,
            contact
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
            address,
            contact
        );

        res.status(201).json({ message: "Registration successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

