const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para processar o código de confirmação
router.post('/confirm-email', async (req, res) => {
    const { email, code } = req.body;

    try {
        // Procura o usuário pelo e-mail
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.render('thankYou', {
                error: 'Usuário não encontrado!',
                user: { email }
            });
        }

        // Simulando o código armazenado no banco (em um cenário real, você o salva no DB)
        const expectedCode = user.confirmation_code;

        // Valida o código
        if (code == expectedCode) {
            user.confirmed = true;
            await user.save();
            res.render('confirmSuccess', { message: 'Cadastro confirmado com sucesso!' });
        } else {
            res.render('thankYou', {
                error: 'Código inválido. Tente novamente.',
                user
            });
        }
    } catch (error) {
        console.error(error); 
        res.render('thankYou', {
            error: 'Erro ao confirmar cadastro!',
            user: { email }
        });
    }
});

module.exports = router;