'use strict';
module.exports = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send({ mensagem: 'Erro no formato de entrada de dados' });
    }
}