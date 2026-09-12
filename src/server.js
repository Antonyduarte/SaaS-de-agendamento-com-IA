require("dotenv").config()
const app = require("./app")
const job = require("./jobs/expiredAppointments")

const PORT = process.env.SERVER_PORT || 3000

console.log("Starting server...")
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})

job.expiredAppointmens()
