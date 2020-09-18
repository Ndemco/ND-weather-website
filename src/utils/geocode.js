const request = require('request')

/*
makes a request to the mapbox API and returns the latitude and longitude of the given address
and the official name (city; state / providence; country) of the location the coordinates reside on

(eg. "san diego" passed as the address parameter will return "San Diego, California, United States" for location)
*/
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoibmRlbWNvIiwiYSI6ImNrY3owMjRqNTAwemMyeW1sMDIzZW4xbzIifQ.yrXaIoRJzqIilgvcIBFm6w&limit=1'
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find specified location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode