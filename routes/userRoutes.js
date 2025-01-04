const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated'); // Middleware para proteger rotas

// Rotas Públicas
router.post('/register', userController.register); // Registrar novo usuário
router.post('/login', userController.login); // Login de usuário
router.post('/forgot-password', userController.forgotPassword); // Solicitar redefinição de senha
router.post('/reset-password', userController.resetPassword); // Redefinir senha com token

// Rotas Protegidas
router.use(isAuthenticated); // Aplica o middleware de autenticação nas rotas abaixo

router.put('/profile', userController.updateProfile); // Atualizar perfil do usuário
router.get('/', userController.listUsers); // Listar usuários com filtros (para admin)
router.delete('/:id', userController.deleteUser); // Deletar usuário pelo ID

module.exports = router;