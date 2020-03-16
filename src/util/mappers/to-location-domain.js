module.exports = {
    toLocationDomain: location => {
        const locationDomain = {};

        locationDomain.id = location.id;
        locationDomain.address = location.DeliveryAddress || location.address;
        locationDomain.addressTwo = location.addressTwo;
        locationDomain.city = location.DeliveryCity || location.city;
        locationDomain.state = location.DeliveryState || location.state;
        locationDomain.zip = location.DeliveryZip || location.zip;

        return locationDomain;
    }
};