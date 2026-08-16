const mysql = require("mysql2")
const pool = require("../../../../config/db/db")

const connection = pool

async function userEmail(email) {

    const [rows] = await connection.query("SELECT id FROM clientes WHERE email = ?", [email])
    if (rows.length === 0) {
        return null
    }

    return rows[0]
}

async function recoveryCode(user_id, code_hash) {
    const [result] = await connection.query("INSERT INTO recovery_codes (user_id, code_hash, expires_at) VALUES(?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))", [user_id, code_hash])

    return result
}

module.exports = { recoveryCode, userEmail }