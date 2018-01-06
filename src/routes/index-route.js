'use strict';

const express = require('express');
const router = express.Router();
const usuarioMediator = require('./../mediator/usuario-mediator');

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Rest Example API",
        version: "0.0.2"
    });
});

router.post('/signup', usuarioMediator.createUser);

router.post('/signin', usuarioMediator.authenticate);

module.exports = router;