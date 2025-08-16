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
            address VARCHAR(255),
            contact VARCHAR(20),
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
    username, password, role,
    firstname, lastname, birthdate, sex, address, contact
) {
    const result = await pool.query(
        `INSERT INTO users 
        (username, password, role, firstname, lastname, birthdate, sex, address, contact) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [username, password, role, firstname, lastname, birthdate, sex, address, contact]
    );
    return result.rows[0];
}

module.exports = {
    initUserTable,
    findUserById,
    findUserByUsername,
    createUser
};