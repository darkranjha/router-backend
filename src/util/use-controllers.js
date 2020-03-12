const {GET, POST, PATCH, PUT, DELETE} = require('./constants');
const acceptableMethods = [GET, POST, PATCH, PUT, DELETE];
const isEmpty = str => (!str || 0 === str.length);
const isValidRoute = (method, endpoint, handler) => {
  if (!method || !acceptableMethods.includes(method)) {
    return false;
  }
  return !(isEmpty(endpoint) || !handler);
};

const printInvalidRoute = (method, endpoint, handler) => {
  console.warn(`Invalid route: { method: ${method}, endpoint: ${endpoint}, handler: ${handler} }, ignoring...`);
};

const printRoute = (method, endpoint) => {
  console.log(`Setting route: ${method} ${endpoint}`);
};

module.exports = (app, controllers) => {
  controllers.forEach(endpoints => {
    endpoints.forEach(({endpoint, method, handler}) => {
      if (isValidRoute(method, endpoint, handler)) {
        app[method.toLowerCase()](endpoint, handler);
        printRoute(method, endpoint);
      } else {
        printInvalidRoute(method, endpoint, handler);
      }
    });
  });
};
