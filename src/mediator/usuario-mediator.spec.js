'use strict';
// var proxyquire = require('proxyquire');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);
// var sinon = require('sinon');

var request = require('supertest');

describe('Teste dos cenários envolvendo a manipulação dos registros de usuários', function () {

    var server;

    before(function () {
        server = require('./../../bin/server');
    });

    after(function (done) {
        server.close(done);
    });

    it('Verificar email existente', function (done) {

        var usuario = {
            "nome": "usuário",
            "email": "user@mail.com",
            "senha": "senha",
            "telefones": [{ "numero": "123456789", "ddd": "11" }]
        };

        chai.request(server).post('/signup').send(usuario).end((error, response) => {
            response.should.have.status(409);
            response.body.mensagem.should.equal('E-mail já existente');
            done();
        });

    });

    it('Verificar login com sucesso', function (done) {

        var credentials = {
            'email': 'user@mail.com',
            'senha': 'user123'
        };

        chai.request(server).post('/signin').send(credentials).end((error, response) => {
            response.should.have.status(201);
            done();
        });

    });

    it('Verificar token do usuário logado', function (done) {

        var credentials = {
            'email': 'user@mail.com',
            'senha': 'user123'
        };

        chai.request(server).post('/signin').send(credentials).end((error, response) => {
            response.body.should.have.property('_id');
            response.body.should.have.property('token');
            done();
        });

    });

    it('Verificar acesso não autorizado', function (done) {

        chai.request(server).get('/usuarios/1').end((error, response) => {
            response.should.have.status(401);
            response.body.mensagem.should.equal('Não autorizado');
            done();
        });

    });

    it('Verificar token expirado', function (done) {

        chai.request(server).get('/usuarios/')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiVXNlciIsImVtYWlsIjoidXNlckBtYWlsLmNvbSIsInNlbmhhIjoiJDJhJDEwJEdManhLLmVBMHhzbkxzV3AzQzhBNnUvRjBBbXA0LjFQZXk0Y3R6akxxSkN3TS5pakZUaW1tIiwidGVsZWZvbmVzIjpbeyJudW1lcm8iOiIxMjM0NTY3ODkiLCJkZGQiOiIxMSJ9XSwiZGF0YV9jcmlhY2FvIjoxNTE1MTg4MjA2MDg2LCJ1bHRpbW9fbG9naW4iOjE1MTUxODgyMDYwODYsImlhdCI6MTUxNTE4ODIwNiwiZXhwIjoxNTE1Mjc0NjA2fQ.wILrshh6BarSipy7-XmNUXreT_XKQq-vjDpolwKsUeQ')
            .end((error, response) => {
                response.should.have.status(401);
                response.body.mensagem.should.equal('Token Inválido');
                done();
            });

    });



});