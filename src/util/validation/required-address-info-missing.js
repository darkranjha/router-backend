module.exports = {
    requiredAddressInfoMissing: address => {
        const {
            address_line1,
            city_locality,
            state_province
        } = address;

        return !address_line1 || !city_locality || !state_province;
    }
};