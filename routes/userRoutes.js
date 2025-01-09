const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated'); // Middleware para proteger rotas

// Rotas Públicas
// Rota para exibir o formulário de registro
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Rota para processar o registro de usuário
router.post('/register', userController.register);

router.get('/login', userController.showLoginPage);
router.post('/login', userController.login);

router.post('/forgot-password', userController.forgotPassword); // Solicitar redefinição de senha
router.get('/forgot-password', (req, res) => {
    res.render('forgotPassword', { error: null, message: null });
});
router.post('/reset-password', userController.resetPassword); // Redefinir senha com token

router.get('/reset-password', (req, res) => {
    const { token } = req.query;

    // Renderiza a página de redefinição de senha com valores padrão
    res.render('resetPassword', { token, error: null, message: null });
});

router.post('/auth/confirm-email', userController.confirmEmail);

// Rotas Protegidas
router.use(isAuthenticated); // Aplica o middleware de autenticação nas rotas abaixo

router.put('/profile', userController.updateProfile); // Atualizar perfil do usuário
router.get('/', userController.listUsers); // Listar usuários com filtros (para admin)
router.delete('/:id', userController.deleteUser); // Deletar usuário pelo ID

router.get('/dashboard', (req, res) => {
    res.render('dashboard');  // Renderiza a página dashboard.ejs
});

module.exports = router;