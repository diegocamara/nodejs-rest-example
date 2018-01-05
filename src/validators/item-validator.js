'use strict';

let errors;

function ItemValidator() {
    errors = [];
}

ItemValidator.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min) {
        errors.push(message);
    }
};

ItemValidator.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max) {
        errors.push(message);
    }
};

ItemValidator.prototype.isEmail = (email, message) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !re.test(email.toLowerCase())) {
        errors.push(message);
    }
};

ItemValidator.prototype.isValid = () => {
    return errors.length == 0;
};

ItemValidator.prototype.errors = () => {
    return errors;
};

module.exports = ItemValidator;