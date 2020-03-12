const {POST} = require('../util/constants');
const {convertJobLocationsFileToJson, fetchJobLocations} = require('../services/job-locations-service');
const {sendFormattedResponse} = require('../util/rest/send-formatted-response');

const endpoints = [{
  endpoint: '/jobListLocations',
  method: POST,
  handler: (req, res) => {
    const excelFilePayload = req.files.file;
    const convertedJobs = convertJobLocationsFileToJson(excelFilePayload);

    res.json(fetchJobLocations(convertedJobs));
  }
}];

module.exports = endpoints;