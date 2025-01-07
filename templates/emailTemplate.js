module.exports = (name, code) => {
    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmação de E-mail</title>
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
            .code {
                font-size: 32px;
                font-weight: bold;
                background-color: #f0f0f0;
                padding: 10px;
                display: inline-block;
                margin: 20px 0;
                border-radius: 8px;
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
                <h1>Bem-vindo, ${name}!</h1>
                <p>Confirme seu e-mail utilizando o código abaixo:</p>
                <div class="code">${code}</div>
                <p>Ou clique no botão abaixo para confirmar automaticamente:</p>
                <a href="https://chamachurras.com/confirmar?code=${code}" class="button">Confirmar E-mail</a>
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