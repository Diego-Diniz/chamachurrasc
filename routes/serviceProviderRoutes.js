const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/serviceProviderController');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Rota para exibir o formulário de cadastro
router.get('/register-provider', isAuthenticated, serviceProviderController.showRegisterForm);

// Rota para processar o cadastro
router.post('/register-provider', isAuthenticated, serviceProviderController.registerProvider);

module.exports = router;