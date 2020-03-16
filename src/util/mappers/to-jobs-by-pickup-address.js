module.exports = {
    toJobsByPickupAddress: (jobsByPickupAddress, jobs) => {
        const {
            PickupAddress,
            PickupCity,
            PickupState,
            PickupZip
        } = jobs;
        const fullPickupAddress = `${PickupAddress}, ${PickupCity}, ${PickupState}, ${PickupZip}`;

        if (!jobsByPickupAddress[fullPickupAddress]) {
            jobsByPickupAddress[fullPickupAddress] = [];
        }
        jobsByPickupAddress[fullPickupAddress].push(jobs);
        return jobsByPickupAddress;
    }
};