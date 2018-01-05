'use strict';

const express = require('express');
const router = express.Router();
const usuarioMediator = require('./../mediator/usuario-mediator');

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.2"
    });
});

router.post('/sigup', usuarioMediator.createUser);

router.post('/sigin', usuarioMediator.authenticate);

module.exports = router;