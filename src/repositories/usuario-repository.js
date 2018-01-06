'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.create = async (data) => {
    let usuario = new Usuario(data);
    return await usuario.save()
};

exports.findByEmail = async (email) => {
    let usuario = await Usuario.findOne({
        email: email
    });
    return usuario;
};

exports.findById = async (id) => {
    let usuario = await Usuario.findOne({
        _id: id
    });
    return usuario;
};

exports.findByEmailAndUpdateLastLogin = async (email) => {
    let usuario = await Usuario.findOneAndUpdate({ email: email }, {
        '$set': { ultimo_login: Date.now() }
    }, { 'new': true });
    return usuario;
};