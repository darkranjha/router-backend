const fs = require('fs-extra');
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const tempJson = require('./jobs-with-lat-lng-parsed');

const hashPickupAddress = address => {
    let hashedAddress = '';
    for (let i = 0; i < address.length; i++) {
      hashedAddress = `${hashedAddress}${address.charCodeAt(i)}`;
    }
    return hashedAddress;
};

module.exports = {
  convertJobLocationsFileToJson: ({file}) => {
    const converted = excelToJson({sourceFile: file}).xmlRpt;
    fs.emptyDir(path.join(__dirname, '..', '..', 'data'));

    const propNames = converted.shift();

    return converted.map(job => {
      const parsedJob = {};
      Object.keys(job).forEach(key => {
        parsedJob[propNames[key]] = job[key];
      });
      return parsedJob;
    });
  },
  fetchJobLocations: convertedJobs => {
    return tempJson.reduce((jobsByPickupAddress, job) => {
      const {
        PickupAddress,
        PickupCity,
        PickupState,
        PickupZip
      } = job.orderDetails;
      const fullPickupAddress = `${PickupAddress}, ${PickupCity}, ${PickupState}, ${PickupZip}`;

      if (!jobsByPickupAddress[fullPickupAddress]) {
        jobsByPickupAddress[fullPickupAddress] = [];
      }
      jobsByPickupAddress[fullPickupAddress].push(job);
      return jobsByPickupAddress;
    }, {});
  }
};