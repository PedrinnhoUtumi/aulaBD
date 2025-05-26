var nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

//Para funcionar, a conta GMAIL precisa ter a autenticação em duas etapas atividada
//Com isso, será possível acessar o link: https://security.google.com/settings/security/apppasswords
//O código que ele gerar, use como senha
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  }
});

var mailOptions = {
  from: 'leandro.utfpr.cm@gmail.com',
  to: '',
  subject: '',
  text: ''
};

let enviarEmail = function(emailDestino, assunto, mensagem){
    mailOptions.to = emailDestino;
    mailOptions.subject = assunto;
    mailOptions.text = mensagem;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = enviarEmail;