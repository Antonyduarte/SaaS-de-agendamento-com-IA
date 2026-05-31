const express = require("express")
const { apiResponse } = require("../utils/apiRes")
const router = express.Router()

function pageNotFound(req, res, next) {
    return res.status(404).json(apiResponse(
        false,
        "Rota não encontrada"
    ))
}

module.exports = pageNotFound