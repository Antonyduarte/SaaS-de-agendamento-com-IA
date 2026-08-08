require("dotenv").config()
const app = require("./app")

const PORT = process.env.SERVER_PORT || 3000

console.log("Starting server...")
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})
