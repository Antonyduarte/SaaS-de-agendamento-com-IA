require("dotenv").config();
const transporter = require("./mail");

function sendCode(userMail, code) {
  transporter.sendMail({
    from: process.env.MAIL_USER,
    to: userMail,
    subject: "Código de verificação",
    text: forgotService.recoveryCode[code]
  })
}

// const sendCode = transporter.sendMail({
//   from: process.env.MAIL_USER,
//   to: "antonyrafael3214@gmail.com",
//   subject: "Teste",
//   text: "Deu certo esse carai",
// });

module.exports = { sendCode }
