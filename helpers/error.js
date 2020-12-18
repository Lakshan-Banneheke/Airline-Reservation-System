/* eslint-disable max-classes-per-file */
/**
 * The abstract class for all handled error: 400, 401, 403, 404, 500
 * @param  {string} message Error message
 */
class ExtendableError extends Error {
    constructor(message) {
        if (new.target === ExtendableError) {
            throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
        }
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.contructor);
    }
}

/**
 * Error class for 400: Bad Request
 * @param  {string} m Error message
 */
class BadRequest extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('bad request');
        } else {
            super(m);
        }
    }
}

/**
 * Error class for 401: Unauthorized
 * @param  {string} m Error message
 */
class Unauthorized extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('unauthorized');
        } else {
            super(m);
        }
    }
}

/**
 * Error class for 403: Forbidden
 * @param  {string} m Error message
 */
class Forbidden extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('forbidden');
        } else {
            super(m);
        }
    }
}

/**
 * Error class for 404: Not Found
 * @param  {string} m Error message
 */
class NotFound extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('not found');
        } else {
            super(m);
        }
    }
}

/**
 * Error class for 409: Conflict
 * @param  {string} m Error message
 */
class Conflict extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('conflict');
        } else {
            super(m);
        }
    }
}

/**
 * Error class for 422: Unprocessable Entity
 * @param  {string} m Error message
 */
class UnprocessableEntity extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('unprocessable entity');
        } else {
            super(m);
        }
    }
}

/**
 * Error class for 500: Internal Server Error
 * @param  {string} m Error message
 */
class InternalServerError extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('internal server error');
        } else {
            super(m);
        }
    }
}

module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.Forbidden = Forbidden;
module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.UnprocessableEntity = UnprocessableEntity;
module.exports.InternalServerError = InternalServerError;