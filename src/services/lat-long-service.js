const {spawn} = require('child_process');

module.exports = {
    getLatLongsForLocations: locations => new Promise(resolve => {
        let locationsWithLatLongs = '';
        const latLongProcess = spawn(process.env.LAT_LONG_SERVICE_EXECUTABLE_PATH, [], {
            stdio: [null, null, process.stderr]
        });
        latLongProcess.stdin.setEncoding('utf-8');

        latLongProcess.stdout.on('data', (data) => {
            locationsWithLatLongs = `${locationsWithLatLongs}${data}`;
        });

        latLongProcess.on('close', () => {
            resolve(JSON.parse(locationsWithLatLongs.trim()));
        });

        latLongProcess.stdin.write(JSON.stringify(locations) + '\r\n');
        latLongProcess.stdin.end();
    })
};
