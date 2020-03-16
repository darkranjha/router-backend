const fs = require('fs-extra');
const excelToJson = require('convert-excel-to-json');
const {toJobDomain} = require('../util/mappers/to-job-domain');
const {toJobsByPickupAddress} = require('../util/mappers/to-jobs-by-pickup-address');

module.exports = {
    convertJobFileToJson: ({file}) => {
        const {xmlRpt: converted} = excelToJson({sourceFile: file});
        fs.remove(file);

        const propNames = converted.shift();

        return converted
            .map(toJobDomain(propNames))
            .reduce(toJobsByPickupAddress, {});
    }
};