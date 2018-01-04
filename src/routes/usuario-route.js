'use strict';

const express = require('express');
const router = express.Router();
const usuarioMediator = require('./../mediator/usuario-mediator');

router.post('/', usuarioMediator.createUser);

// router.post('/authenticate', usuarioMediator.authenticate);

module.exports = router;