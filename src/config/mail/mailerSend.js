require("dotenv").config();
const transporter = require("./mail");

async function sendCode(userMail, code) {
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to: userMail,
    subject: "Código de verificação",
    text: `Seu código de verificação para recuperar sua conta é ${code}`
  })
}
// const sendCode = transporter.sendMail({
//   from: process.env.MAIL_USER,
//   to: "antonyrafael3214@gmail.com",
//   subject: "Teste",
//   text: "Deu certo esse carai",
// });

module.exports = { sendCode }
