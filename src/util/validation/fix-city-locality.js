module.exports = {
    fixCityLocality: address => {
        const fixedAddress = {
            ...address
        };
        if (fixedAddress.address_line2 && !fixedAddress.city_locality) {
            fixedAddress.city_locality = fixedAddress.address_line2;
            delete fixedAddress.address_line2;
        }
        return fixedAddress;
    }
};