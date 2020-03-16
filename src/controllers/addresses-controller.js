const {POST} = require('../util/constants');
const {recognizeAddress, validateAddress} = require('../services/addresses-service');
const {toAddressDomain} = require('../util/mappers/to-address-domain');
const {requiredAddressInfoMissing} = require('../util/validation/required-address-info-missing');
const {fixCityLocality} = require('../util/validation/fix-city-locality');

const endpoints = [{
    endpoint: '/addresses/validate',
    method: POST,
    handler: async (req, res) => {
        const address = req.body.address;

        try {
            const {data: {address: recognizedAddress}} = await recognizeAddress(address);
            const parsedAddress = fixCityLocality(recognizedAddress);
            if (requiredAddressInfoMissing(parsedAddress)) {
                return res.status(400).end();
            }

            const {data: [addressData]} = await validateAddress(parsedAddress);
            const {matched_address: matchedAddress} = addressData;

            return res.json(toAddressDomain(matchedAddress));
        } catch (error) {
            if (error.response) {
                const {response: {status, data}} = error;
                return res.status(status).json(data);
            }
        }
    }
}];

module.exports = endpoints;