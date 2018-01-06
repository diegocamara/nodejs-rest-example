'use strict';
var proxyquire = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Teste dos cenários envolvendo a manipulação dos registros de usuários', function () {

    var usuarioMediator;

    beforeEach(function () {

        var UsuarioRepository = {};
        usuarioMediator = proxyquire('./usuario-mediator', { 'UsuarioRepository': UsuarioRepository });
    });

    it('Deve validar a criação do usuário por email inválido.', function () {
        //    expect(usuarioMediator.createUser()).to.be.a.Function;
    });
});