const mysql = require("mysql2")
const pool = require("../../config/db/db")

const connection = pool

// POST - AGENDAR HORARIO
async function agendar(user_id, nome, data, hora) {

    let [result] = await connection.query("INSERT INTO agendamentos (user_id, nome, data, hora) VALUES(?, ?, ?, ?)", [user_id, nome, data, hora])

    return result[0] || null
}
async function horarioVerify(user_id, data, hora) {

    let [result] = await connection.query("SELECT id FROM agendamentos WHERE user_id = ? AND data = ? AND hora = ?", [user_id, data, hora])

    return result[0] || null
}
// GET - VER AGENDAMENTOS
async function getAgenda(user_id){
    let [result] = await connection.query("SELECT * FROM agendamentos WHERE user_id = ?", [user_id])

    return result
}

module.exports = { agendar, horarioVerify, getAgenda }