module.exports = {
    toJobDomain: propNames => job => {
        const parsedJob = {};
        Object.keys(job).forEach(key => {
            parsedJob[propNames[key]] = job[key];
        });
        return parsedJob;
    }
};