const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para processar o código de confirmação (POST)
router.post('/confirm-email', async (req, res) => {
    const { email, code } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.render('confirmEmail', {
                error: 'Usuário não encontrado!',
                user: { email }
            });
        }

        const expectedCode = user.confirmation_code;

        // Adicione o código aqui
        if (code == expectedCode) {
            user.confirmed = true; // Atualiza o campo confirmado
            await user.save();     // Salva no banco de dados

            console.log('Status confirmado no banco:', user.confirmed); // Verifica o estado
            console.log('Cadastro confirmado! Redirecionando...');
            return res.redirect('/auth/confirmSuccess'); // Redireciona para a página de sucesso
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

// Rota para confirmar o e-mail automaticamente
router.get('/confirmar', async (req, res) => {
    const { code } = req.query;

    try {
        const user = await User.findOne({ where: { confirmation_code: code } });

        if (!user) {
            return res.status(404).send('Código de confirmação inválido ou expirado.');
        }

        // Confirma o usuário
        user.confirmed = true;  // Atualiza o campo para true
        user.confirmation_code = null;  // Limpa o código após confirmação
        await user.save();  // Salva no banco

        console.log('Usuário confirmado com sucesso.');

        // Redireciona para a página de sucesso
        res.redirect('/auth/confirmSuccess');
    } catch (error) {
        console.error('Erro ao confirmar e-mail:', error);
        res.status(500).send('Erro interno ao confirmar e-mail.');
    }
});

module.exports = router;