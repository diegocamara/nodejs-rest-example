'use strict';

let errors;

function ItemValidator() {
    errors = [];
}

ItemValidator.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min) {
        errors.push({ message: message });
    }
};

ItemValidator.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max) {
        errors.push({ message: message });
    }
};

ItemValidator.prototype.isValid = () => {
    return errors.length == 0;
};

ItemValidator.prototype.errors = () => {
    return errors;
};

module.exports = ItemValidator;