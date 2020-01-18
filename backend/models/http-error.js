//The class extends Error menaing it is based on the Error class but we will be chanign how it looks and functions.
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); //Add a message property to instances
        this.code = errorCode; //Add ann error code to instances
    }
}

module.exports = HttpError;