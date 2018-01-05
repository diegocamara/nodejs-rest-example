'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonFormatHandle = require('./middleware/json-format-handle');
const config = require('./config');

const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONNECTION_URL, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

const Usuario = require('./models/usuario');

const indexRoute = require('./routes/index-route');
const usuarioRoute = require('./routes/usuario-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonFormatHandle);

app.use('/', indexRoute);
app.use('/usuarios', usuarioRoute);

module.exports = app;