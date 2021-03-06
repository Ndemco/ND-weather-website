const request = require("request")

/*
makes a request to weatherstack API and returns JSON containing weather conditions for the given latitude and longitude

intended to take the latitiude and longitude coordinates returned by the geocode() method
*/
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3e0ed4c38d2151518810009867cc1af2&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature +
                " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity level is " +
                body.current.humidity)
        }
    })
}

module.exports = forecast