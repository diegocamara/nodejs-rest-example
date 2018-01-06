'use strict';

const express = require('express');
const router = express.Router();
const usuarioMediator = require('./../mediator/usuario-mediator');

router.get('/:id', usuarioMediator.findOne);

module.exports = router;