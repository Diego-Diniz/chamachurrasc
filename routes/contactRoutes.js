const express = require('express');
const ContactRequest = require('../models/ContactRequest');
const axios = require('axios'); // Para chamadas HTTP
const router = express.Router();

// Formulário de Solicitação
router.get('/', (req, res) => {
    res.render('welcome');
});


module.exports = router;