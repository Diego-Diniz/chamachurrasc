const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const enviarEmail = require('../services/emailService');
const resetPasswordTemplate = require('../templates/resetPasswordTemplate');


// Registro de novo usuário
exports.register = async (req, res) => {
    const { name, email, password, phone, zip_code, profile_picture } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.render('register', { error: 'Email já cadastrado!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const confirmationCode = Math.floor(100000 + Math.random() * 900000); // Gera código de 6 dígitos

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            zip_code,
            profile_picture,
            confirmation_code: confirmationCode
        });

        // Enviar o e-mail com o código
        await enviarEmail(
            email,
            'Confirme seu cadastro - ChamaChurras',
            name,
            confirmationCode
        );

        res.render('confirmEmail', {
            message: 'Cadastro realizado. Verifique seu e-mail!',
            user: newUser,
            error: null // Adicione a variável error como null
        });
    } catch (error) {
        console.error(error);
        res.render('register', { error: 'Erro ao registrar o usuário' });
    }
};


// Login de usuário
exports.showLoginPage = (req, res) => {
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.render('login', { error: 'Usuário não encontrado' });
        }

        // Verifica se o e-mail foi confirmado
        if (!user.confirmed) {
            return res.render('login', {
                error: 'E-mail não confirmado. Verifique sua caixa de entrada.',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.render('login', { error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user.id, user_type: user.user_type }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');  // Redireciona para o painel após login
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Erro ao fazer login' });
    }
};

// Atualizar informações do usuário
exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, phone, zip_code, profile_picture } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await user.update({
            name,
            phone,
            zip_code,
            profile_picture,
        });

        res.status(200).json({ message: 'Perfil atualizado com sucesso!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
};

// Recuperação de senha (solicitar token)
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.render('forgotPassword', { error: 'Usuário não encontrado' });
        }

        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await user.update({
            reset_token: resetToken,
            reset_token_expiry: new Date(Date.now() + 3600000), // 1 hora de validade
        });

        const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
        const emailContent = resetPasswordTemplate(user.name, resetLink);

        await enviarEmail(
            email,
            'Redefinição de Senha - ChamaChurras',
            emailContent
        );

        res.render('forgotPassword', { error: null, message: 'Verifique seu email para redefinir a senha' });
    } catch (error) {
        console.error(error);
        res.render('forgotPassword', { error: 'Erro ao processar solicitação' });
    }
};

// Redefinição de senha
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            where: {
                reset_token: token,
                reset_token_expiry: { [Op.gt]: new Date() },
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token inválido ou expirado' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({
            password: hashedPassword,
            reset_token: null,
            reset_token_expiry: null,
        });

        res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao redefinir senha' });
    }
};

// Listar usuários com filtros
exports.listUsers = async (req, res) => {
    const { user_type, status } = req.query;

    try {
        const users = await User.findAll({
            where: {
                ...(user_type && { user_type }),
                ...(status && { status }),
            },
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await user.destroy();
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};

exports.confirmEmail = async (req, res) => {
    const { email, code } = req.body;

    try {
        const user = await User.findOne({ where: { email, confirmation_code: code } });

        if (!user) {
            return res.render('confirmEmail', {
                user: { email }, 
                error: 'Código de confirmação inválido. Verifique e tente novamente.'
            });
        }

        await user.update({ confirmed: true, confirmation_code: null });

        res.render('login', { error: 'E-mail confirmado com sucesso! Faça login para continuar.' });
    } catch (error) {
        console.error(error);
        res.render('confirmEmail', { user: { email }, error: 'Erro ao confirmar e-mail.' });
    }
};