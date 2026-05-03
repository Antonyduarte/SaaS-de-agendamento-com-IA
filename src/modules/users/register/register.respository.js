require("dotenv").config()
const sql = require("mysql2")
const pool = require("../../../config/db/db")

const connection = pool

async function findByEmail(email) {
    const [rows] = await connection.query("SELECT * FROM clientes WHERE email = ?")

    return rows[0] || null
}

async function userRegister(nome, email, senha) {

    const [result] = await connection.query("INSERT INTO clientes (nome, email, senha) VALUES(?, ?, ?)")

    return result[0] || null
}

module.exports = { findByEmail, userRegister }