const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para processar o código de confirmação (POST)
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

        // Validação do código de confirmação
        const expectedCode = user.confirmation_code;

        if (code == expectedCode) {
            user.confirmed = true;
            await user.save();
            
            // Redireciona para a rota de sucesso
            res.redirect('/auth/confirmSuccess');
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

// Rota para exibir a página de sucesso (GET)
router.get('/confirmSuccess', (req, res) => {
    res.render('confirmSuccess', { message: 'Cadastro confirmado com sucesso!' });
});

module.exports = router;