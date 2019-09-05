const request = require('request');
const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
        ".json?access_token=pk.eyJ1IjoibmF2ZWVuNjAyIiwiYSI6ImNrMDN0dHJjdTJpODEzZ3E5YXZ4bXh6cGgifQ.2OMJFEN6bZEp0JCS78or0A&limit=1";
    request({
        url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to location services!", );
        } else if (body.message || body.features.length === 0) {

            callback("Unable to find location. Try another search!", );

        } else {
            const lat = body.features[0].center[0];
            const lang = body.features[0].center[1];
            callback(undefined, {
                lat: lat,
                lang: lang,
                location: body.features[0].place_name
            });
        }
    });
}
module.exports = geocode