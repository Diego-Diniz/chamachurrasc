const sgMail = require('@sendgrid/mail');
const emailTemplate = require('../templates/emailTemplate');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Função genérica para envio de e-mails com template
const enviarEmail = async (to, subject, name, code) => {
    const htmlContent = emailTemplate(name, code);

    const msg = {
        to,
        from: process.env.EMAIL_FROM,
        subject,
        html: htmlContent,
    };

    try {
        await sgMail.send(msg);
        console.log(`E-mail enviado para: ${to}`);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw new Error('Falha no envio de e-mail.');
    }
};

module.exports = enviarEmail;