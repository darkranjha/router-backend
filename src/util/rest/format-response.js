const {
  create,
  success,
  badRequest,
  unAuthorized,
  forbidden,
  notFound,
  notAllowed,
  requestTimeout,
  internalError,
  badGateway,
  unavailable,
  gatewayTimeout
} = require('response-format');

module.exports = {
  formatResponse: (code, message, data) => {
    switch (code) {
      case 0:
      case 200:
      case 201:
      case 204:
        return success(message, data);
      case 400:
        return badRequest(message, data);
      case 401:
        return unAuthorized(message, data);
      case 403:
        return forbidden(message, data);
      case 404:
        return notFound(message, data);
      case 405:
        return notAllowed(message, data);
      case 408:
        return requestTimeout(message, data);
      case 451:
        return create(451, true, message, data);
      case 500:
        return internalError(message, data);
      case 502:
        return badGateway(message, data);
      case 503:
        return unavailable(message, data);
      case 504:
        return gatewayTimeout(message, data);
      default:
        return internalError(message, data);
    }
  }
};