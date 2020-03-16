const {POST} = require('../util/constants');
const {convertJobFileToJson} = require('../services/jobs-service');

const endpoints = [{
    endpoint: '/jobs/convert',
    method: POST,
    handler: async (req, res) => {
        const excelFilePayload = req.files.file;
        const convertedJobs = await convertJobFileToJson(excelFilePayload);

        return res.json(convertedJobs);
    }
}];

module.exports = endpoints;