const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para processar o código de confirmação (POST)
router.post('/confirm-email', async (req, res) => {
    console.log('Dados recebidos:', req.body);  // Verifica o conteúdo do req.body
    const { email, code } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('Usuário não encontrado.');
            return res.render('confirmEmail', {
                error: 'Usuário não encontrado!',
                user: { email }
            });
        }

        const expectedCode = user.confirmation_code;
        console.log('Código esperado:', expectedCode);
        console.log('Código digitado:', code);

        if (code == expectedCode) {
            user.confirmed = true;
            await user.save();
            
            console.log('Cadastro confirmado! Redirecionando...');
            return res.redirect('/auth/confirmSuccess');
        } else {
            console.log('Código inválido.');
            return res.render('confirmEmail', {
                error: 'Código inválido. Tente novamente.',
                user
            });
        }
    } catch (error) {
        console.error('Erro ao processar:', error);
        res.render('confirmEmail', {
            error: 'Erro ao confirmar cadastro!',
            user: { email }
        });
    }
});

// Rota para exibir a página de sucesso (GET)
router.get('/confirmSuccess', (req, res) => {
    res.render('confirmSuccess', { message: 'Cadastro confirmado com sucesso!' });
});

router.get('/confirm-email', (req, res) => {
    res.render('confirmForm', { user: req.query });  // Renderiza o formulário
});

module.exports = router;