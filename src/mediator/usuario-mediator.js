'use strict';

const ItemValidator = require('./../validators/item-validator');
const UsuarioRepository = require('../repositories/usuario-repository');
const authService = require('./../services/auth-service');
let bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {

    let novoUsuario = req.body;

    if (await userExists(novoUsuario.email)) {
        res.status(404).json({
            mensagem: 'E-mail já existente'
        });
        return;
    }

    let dataAtual = Date.now();
    novoUsuario.data_criacao = dataAtual;
    novoUsuario.ultimo_login = dataAtual;
    novoUsuario.senha = await getUserPassHash(novoUsuario.senha);
    novoUsuario.token = await authService.generateToken(novoUsuario);

    try {
        novoUsuario = await UsuarioRepository.create(novoUsuario);
        res.status(201).send(novoUsuario);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar cliente!',
            data: e
        });
    }

};

let getUserPassHash = async (senha) => {
    let userPassHash = await bcrypt.hash(senha, global.SALT_ROUNDS);
    return userPassHash;
};

let userExists = async (email) => {
    let usuario = await UsuarioRepository.findByEmail(email);
    return usuario !== null;
};

exports.authenticate = async (req, res, next) => {

    let credentials = req.body;
    

    try {
        const usuario = await UsuarioRepository.findByEmail(credentials.email);
        
        let checkHashHandle = async (err, isMatch) => {

            if (isMatch) {

                res.status(201).send(usuario);

            } else {
                res.status(401).send({
                    message: 'Senha inválida'
                });
                return;
            }

        }

        if (usuario) {

            bcrypt.compare(credentials.senha, usuario.senha, checkHashHandle);

        } else {
            res.status(404).send({
                message: 'Usuário inválido'
            });
            return;
        }


    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar cliente!',
            data: e
        });
    }

};