'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, process.env.JWT_KEY);
    return data;
}

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!token) {
        res.status(401).json({
            mensagem: 'Não autorizado'
        });
    } else {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {

            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {                
                res.locals.token = token;
                next();
            }

        });
    }

}