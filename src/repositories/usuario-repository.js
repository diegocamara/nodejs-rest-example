'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.create = async (data) => {
    let usuario = new Usuario(data);
    return await usuario.save()
};

exports.authenticate = async (data) => {
    let res = await Usuario.findOne({
        email: data.email
    });
    return res;
};

let findByEmail = async (email) => {
    let usuario = await Usuario.findOne({
        email: email
    });
    return usuario;
};

exports.findByEmail = findByEmail;