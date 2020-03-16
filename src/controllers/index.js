const addressesController = require('./addresses-controller');
const locationsController = require('./locations-controller');
const jobsController = require('./jobs-controller');

const controllers = [
    addressesController,
    locationsController,
    jobsController
];

module.exports = controllers;
