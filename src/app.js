const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//set port to heroku-provided port value or port 3000 if app run locally
const port = process.env.PORT || 3000

//Definte paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebards engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nick DeMarco'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nick DeMarco'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        //no errors
        //latitude and longitude params are taken from geocode() callback
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            //no errors
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Page not found',
        name: 'Nick DeMarco'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})