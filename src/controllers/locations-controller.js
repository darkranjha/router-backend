const {POST} = require('../util/constants');
const {getLatLongsForLocations} = require('../services/lat-long-service');
const {toLocationDomain} = require('../util/mappers/to-location-domain');

const endpoints = [{
    endpoint: '/locations/latLong',
    method: POST,
    handler: async (req, res) => {
        const locations = req.body;
        const locationsWithLatLong = await getLatLongsForLocations(locations.map(toLocationDomain));

        return res.json(locationsWithLatLong);
    }
}];

module.exports = endpoints;