'use strict';

const ItemValidator = require('./../validators/item-validator');
const UsuarioRepository = require('../repositories/usuario-repository');
const authService = require('./../services/auth-service');
let bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {

    let itemValidator = new ItemValidator();

    let novoUsuario = req.body;
    itemValidator.hasMinLen(novoUsuario.nome, 2, { mensagem: 'O campo nome deve conter pelo menos 2 caracteres' });
    itemValidator.hasMinLen(novoUsuario.senha, 4, { mensagem: 'A senha deve conter pelo menos 4 caracteres' });
    itemValidator.isEmail(novoUsuario.email, { mensagem: 'E-mail inválido' });

    if (!itemValidator.isValid()) {
        res.status(400).send(itemValidator.errors());
        return;
    }

    try {

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

        novoUsuario = await UsuarioRepository.create(novoUsuario);
        res.status(201).send(novoUsuario);

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar usuário!',
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

    let itemValidator = new ItemValidator();

    let credentials = req.body;

    itemValidator.isEmail(credentials.email, { mensagem: 'E-mail inválido' });
    itemValidator.hasMinLen(credentials.senha, 1, { mensagem: 'O campo senha deve ser preenchido' });

    if (!itemValidator.isValid()) {
        res.status(400).send(itemValidator.errors());
        return;
    }

    try {
        const usuario = await UsuarioRepository.findByEmail(credentials.email);

        let checkHashHandle = async (err, isMatch) => {

            if (isMatch) {
                res.status(201).send(usuario);
            } else {
                res.status(401).send({
                    message: 'Usuário e/ou senha inválidos'
                });
                return;
            }

        }

        if (usuario) {

            bcrypt.compare(credentials.senha, usuario.senha, checkHashHandle);

        } else {
            res.status(404).send({
                message: 'Usuário e/ou senha inválidos'
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