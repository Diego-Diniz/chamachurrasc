const ServiceProvider = require('../models/ServiceProvider');

exports.showRegisterForm = (req, res) => {
    res.render('registerProvider', { error: null, message: null });
};

exports.registerProvider = async (req, res) => {
    const { location, latitude, longitude, specialty, availableDates, price } = req.body;
    const userId = req.user.id; // Supondo que o usuário está autenticado

    try {
        // Verifica se o usuário já é um prestador de serviço
        const existingProvider = await ServiceProvider.findOne({ where: { userId } });
        if (existingProvider) {
            return res.render('registerProvider', { error: 'Você já está cadastrado como prestador.', message: null });
        }

        // Cria um novo prestador de serviços
        await ServiceProvider.create({
            userId,
            location,
            latitude,
            longitude,
            specialty,
            availableDates,
            price,
        });

        res.render('registerProvider', { error: null, message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.render('registerProvider', { error: 'Erro ao processar o cadastro.', message: null });
    }
};