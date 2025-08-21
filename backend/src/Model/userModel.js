const { pool } = require('../Config/db');

// Create the table if it doesn't exist
async function initUserTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'employee', 'customer')),
            firstname VARCHAR(100),
            lastname VARCHAR(100),
            birthdate DATE,
            sex VARCHAR(10),
            contact VARCHAR(20),
            region VARCHAR(100),
            province VARCHAR(100),
            city VARCHAR(100),
            barangay VARCHAR(100),
            postal_code VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}


async function findUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

async function findUserByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}

async function createUser(
    username,
    password,
    role,
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
) {
    const result = await pool.query(
        `INSERT INTO users 
        (username, password, role, firstname, lastname, birthdate, sex, contact, region, province, city, barangay, postal_code) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [
            username,
            password,
            role,
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
        ]
    );
    return result.rows[0];
}

module.exports = {
    initUserTable,
    findUserById,
    findUserByUsername,
    createUser,
    updateUserProfile
};

// Update profile helper
async function updateUserProfile(id, fields) {
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
        'postal_code'
    ];

    const keys = Object.keys(fields).filter(k => allowed.includes(k));
    if (keys.length === 0) {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    }

    const setClauses = keys.map((k, idx) => `${k} = $${idx + 2}`); // start from $2, $1=id
    const values = [id, ...keys.map(k => fields[k])];

    const result = await pool.query(
        `UPDATE users SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
        values
    );
    return result.rows[0];
}