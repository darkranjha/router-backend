module.exports = {
    toAddressDomain: address => {
        const addressDomain = {};

        addressDomain.address = address.address_line1;
        addressDomain.addressTwo = address.address_line2;
        addressDomain.city = address.city_locality;
        addressDomain.state = address.state_province;
        addressDomain.zip = address.postal_code;

        return addressDomain;
    }
};