const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.SENHA
    },
    tls: {
        rejectUnauthorized: false,
    }
})

const mailOptions = {
    from: 'pedroutumi@gmail.com',
    to: '',
    subject: '',
    text: '',
}

function enviarEmail(emailDestino, assunto, mensagem) {
    mailOptions.to = emailDestino
    mailOptions.subject = assunto
    mailOptions.text = mensagem

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email enviado ${info.response}`);
        }
    })
}

module.exports = enviarEmail