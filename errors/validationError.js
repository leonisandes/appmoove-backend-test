class ValidationError extends Error {

    constructor(message, errors, statusCode) {
        super();
        this.message = message;
        this.errors = errors;
        this.statusCode = statusCode;
    }

}

module.exports = ValidationError;
