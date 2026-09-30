const refreshRepo = require("./refresh.repository")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const { MESSAGES } = require("../../../messages/messages")

function generateRefreshToken() {
    return crypto.randomBytes(64).toString("hex")
}

// Mantém o formato do JWT igual no login e na renovação.
function generateAccessToken(user) {
    return jwt.sign({
        id: user.id,
        name: user.nome,
        email: user.email,
        role: user.role
    }, process.env.SECRET_KEY, { expiresIn: "15m" })
}

// console.log(generateRefreshToken())

async function createRefreshToken(user_id) {
    
    const token = generateRefreshToken()

    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await refreshRepo.saveRefreshToken(user_id, token, expires_at)

    return token
}

// Valida o refresh token e cria um novo par. O token antigo é removido,
// implementando a rotação: cada refresh token só pode ser usado uma vez.
async function refreshAccessToken(token) {
    // Defesa em profundidade contra objetos, arrays e outros tipos.
    if (typeof token !== "string" || token.length === 0) {
        throw new Error(MESSAGES.INVALID_REFRESH_TOKEN)
    }

    const storedToken = await refreshRepo.getRefreshToken(token)

    if (!storedToken) {
        throw new Error(MESSAGES.INVALID_REFRESH_TOKEN)
    }

    if (new Date(storedToken.expires_at) <= new Date()) {
        await refreshRepo.deleteRefreshToken(token)
        throw new Error(MESSAGES.EXPIRED_REFRESH_TOKEN)
    }

    const user = await refreshRepo.getUserById(storedToken.user_id)

    if (!user) {
        await refreshRepo.deleteRefreshToken(token)
        throw new Error(MESSAGES.INVALID_REFRESH_TOKEN)
    }

    // Invalida o token usado antes de emitir o próximo.
    await refreshRepo.deleteRefreshToken(token)

    return {
        accessToken: generateAccessToken(user),
        refreshToken: await createRefreshToken(user.id)
    }
}

// Usado pelo logout para encerrar a sessão no servidor.
async function revokeRefreshToken(token) {
    if (typeof token === "string" && token.length > 0) {
        await refreshRepo.deleteRefreshToken(token)
    }
}

module.exports = {
    createRefreshToken,
    refreshAccessToken,
    revokeRefreshToken
}
