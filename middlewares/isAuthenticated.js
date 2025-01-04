const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.redirect('/'); // Redireciona para a página inicial (welcome)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Salva as informações do token no objeto req
        next();
    } catch (error) {
        return res.redirect('/');  // Redireciona em caso de token inválido ou expirado
    }
};