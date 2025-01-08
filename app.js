const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Configuração do EJS e Bootstrap
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/', contactRoutes);
app.use('/', userRoutes);
app.use('/auth', authRoutes);

// Nova rota para exibir a página final com as informações do formulário
app.post('/review', (req, res) => {
    const formData = req.body; // Captura os dados enviados pelo formulário
    res.render('thankYou', { formData }); // Renderiza a página final com os dados
});

// Sincronização com o Banco de Dados
sequelize.sync().then(() => {
    app.listen(3000, '0.0.0.0', () => console.log('Server running on http://0.0.0.0:3000'));
});