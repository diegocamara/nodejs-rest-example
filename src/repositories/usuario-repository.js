'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.create = async (data) => {
    let usuario = new Usuario(data);
    return await usuario.save()
};

let findByEmail = async (email) => {    
    let usuario = await Usuario.findOne({
        email: email
    });
    return usuario;
};

exports.findByEmail = findByEmail;