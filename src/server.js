require("dotenv").config()
const app = require("./app")

const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, () => {
    console.log("Starting server...")
    setTimeout(() => {
        console.log(`Server is running on port: ${PORT}`)
    }, 1100);
})