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
    
    let authorization = req.headers['authorization'];

    let token;

    if (authorization) {
        token = authorization.split(' ')[1];        
    }
   
    if (!token) {
        res.status(401).json({
            mensagem: 'Não autorizado'
        });
    } else {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {

            if (error) {
                res.status(401).json({
                    mensagem: 'Token Inválido'
                });
            } else {
                res.locals.token = token;
                next();
            }

        });
    }

}