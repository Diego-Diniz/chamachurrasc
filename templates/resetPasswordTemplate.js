module.exports = (name, resetLink) => {
    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Redefinição de Senha</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #E4572E;
                padding: 20px;
                text-align: center;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                padding: 30px;
                text-align: center;
            }
            .button {
                display: inline-block;
                padding: 15px 30px;
                background-color: #E4572E;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
            }
            .footer {
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                ChamaChurras
            </div>
            <div class="content">
                <h1>Olá, ${name}</h1>
                <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para redefini-la:</p>
                <a href="${resetLink}" class="button">Redefinir Senha</a>
                <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
            </div>
            <div class="footer">
                © 2024 ChamaChurras. Todos os direitos reservados. <br>
                <a href="https://chamachurras.com">Visite nosso site</a>
            </div>
        </div>
    </body>
    </html>
    `;
};