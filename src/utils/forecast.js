const request = require('request');
const forecast = (data, callback) => {
    const url =
        "https://api.darksky.net/forecast/eea2d956e0315c650d7d81e3ac71a5c0/" + data.lat + "," + data.lang ;

    request({
          url,
            json: true
        },
        (error, response, body) => {
            if (error) {
                callback("Unable to connect to weather services!");
            } else if (body.error) {
                callback("Unable to find the location!");
            } else {
                const temp = body.currently.temperature;
                const percip = body.currently.precipProbability;

                // console.log(
                //     `It is currently ${temp} degrees out. There is a ${percip}% chance of rain.`
                // );
                callback(undefined,
                    `It is currently ${temp} degrees out. There is a ${percip}% chance of rain.`);
            }
        }
    );
}
module.exports = forecast;