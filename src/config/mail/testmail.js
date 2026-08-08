require("dotenv").config()
const transporter = require("./mail")

transporter.sendMail({
    from: process.env.MAIL_USER,
    to: "antonyrafael3214@gmail.com",
    subject: "Teste",
    text: "Deu certo esse carai"
})