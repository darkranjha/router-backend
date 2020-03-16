const axios = require('axios');
const {SHIPENGINE_BASE_URL} = require('../util/constants');

const ADDRESSES_RECOGNIZE_URL = '/addresses/recognize';
const ADDRESSES_VALIDATE_URL = '/addresses/validate';

const getShipEngineHeaders = () => ({
    Host: 'api.shipengine.com',
    'API-Key': process.env.SHIPENGINE_API_KEY,
    'Content-Type': 'application/json'
});

module.exports = {
    recognizeAddress: address => {
        const url = SHIPENGINE_BASE_URL + ADDRESSES_RECOGNIZE_URL;

        const headers = getShipEngineHeaders();

        const payload = {
            text: address,
            address: {
                country_code: 'US'
            }
        };

        return axios.post(url, payload, {headers});
    },
    validateAddress: address => {
        const url = SHIPENGINE_BASE_URL + ADDRESSES_VALIDATE_URL;

        const headers = getShipEngineHeaders();

        address.country_code = 'US';
        return axios.post(url, [address], {headers});
    }
};