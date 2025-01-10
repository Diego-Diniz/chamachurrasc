const ServiceProvider = require('../models/ServiceProvider');

exports.showRegisterForm = (req, res) => {
    res.render('registerProvider', { error: null, message: null });
};

exports.registerProvider = async (req, res) => {
    const { location, latitude, longitude, specialty, availableDates, price } = req.body;

    try {
        const userId = req.user.id; // Obtém o ID do usuário autenticado

        // Verifica se o prestador já existe
        const existingProvider = await ServiceProvider.findOne({ where: { userId } });
        if (existingProvider) {
            return res.render('registerProvider', { error: 'Você já está registrado como prestador.', message: null });
        }

        // Transforma o campo de datas disponíveis em um array
        const datesArray = availableDates
            ? availableDates.split(',').map(date => date.trim())
            : [];

        // Formata o preço para o formato correto do MySQL
        const formattedPrice = parseFloat(price.replace('R$', '').replace(',', '.').trim());

        // Cria o prestador de serviços
        await ServiceProvider.create({
            userId,
            location,
            latitude,
            longitude,
            specialty,
            availableDates: JSON.stringify(datesArray), // Salva como JSON
            price: formattedPrice, // Preço formatado
        });

        res.render('registerProvider', { error: null, message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.render('registerProvider', { error: 'Erro ao processar o cadastro.', message: null });
    }
};