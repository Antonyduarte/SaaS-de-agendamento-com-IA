const mysql = require("mysql2")
const pool = require("../../../config/db/db")

const connection = pool

async function findByEmail(email) {
    const [result] = await connection.query("SELECT * FROM clientes WHERE email = ?", [email])

    return result[0]
}

async function login(email) {

    const [result] = await connection.query("SELECT * FROM clientes WHERE email = ?", [email])

    return result[0] || null
}

module.exports = { findByEmail, login }