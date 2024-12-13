const express = require('express');
const ContactRequest = require('../models/ContactRequest');
const axios = require('axios'); // Para chamadas HTTP
const router = express.Router();

// Formulário de Solicitação
router.get('/', (req, res) => {
    res.render('contactForm');
});

// Submissão de Solicitação
router.post('/submit', async (req, res) => {
    const {
        name, email, phone, eventDate, eventLocation, numberOfGuests,
        budget, eventType, specialRequests, startTime, endTime, message
    } = req.body;

    try {
        // Salvar no banco de dados
        const contactRequest = await ContactRequest.create({
            name,
            email,
            phone,
            eventDate,
            eventLocation,
            numberOfGuests,
            budget,
            eventType,
            specialRequests,
            startTime,
            endTime,
            message
        });

        // Enviar mensagem WhatsApp para o organizador
        await sendWhatsAppNotification(
            '5541985028480', // Número do organizador
            `Novo pedido recebido!
- Nome: ${name}
- WhatsApp: ${phone}
- Data do Evento: ${eventDate}
- Local: ${eventLocation}
- Convidados: ${numberOfGuests}
- Tipo de Evento: ${eventType}
- Detalhes: ${specialRequests || 'Sem solicitações especiais.'}`
        );

        // Redirecionar para a página de agradecimento
        res.redirect(`/thank-you?id=${contactRequest.id}`);
    } catch (error) {
        console.error('Error saving contact request or sending notification:', error);
        res.status(500).send('Error processing the request.');
    }
});

// Página de Agradecimento
router.get('/thank-you', async (req, res) => {
    try {
        // Recuperar os dados com base no ID
        const { id } = req.query;
        const contactRequest = await ContactRequest.findByPk(id);

        if (!contactRequest) {
            return res.status(404).send('Contact request not found.');
        }

        res.render('thankYou', { formData: contactRequest });
    } catch (error) {
        console.error('Error fetching contact request:', error);
        res.status(500).send('Error fetching the contact request.');
    }
});

// Função para enviar mensagens via WhatsApp
async function sendWhatsAppNotification(to, message) {
    const phoneNumberId = '<Phone-Number-ID>'; // Substitua pelo Phone Number ID do seu WhatsApp
    const accessToken = '<ACCESS_TOKEN>'; // Substitua pelo Token de Acesso do WhatsApp API

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v16.0/${phoneNumberId}/messages`,
            {
                messaging_product: 'whatsapp',
                to: to, // Número do destinatário
                type: 'text',
                text: { body: message },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Mensagem WhatsApp enviada com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao enviar a mensagem via WhatsApp:', error.response ? error.response.data : error.message);
    }
}

module.exports = router;