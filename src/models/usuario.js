'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4');
let bcrypt = require('bcrypt');

const schema = new Schema({
    _id: { type: String, default: uuidv4() },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefones: [],
    data_criacao: {
        type: Date,
        required: true
    },
    data_atualizacao: {
        type: Date
    },
    ultimo_login: {
        type: Date
    },
    token: {
        type: String,
    }

});

module.exports = mongoose.model('Usuario', schema);