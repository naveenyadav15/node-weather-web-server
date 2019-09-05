const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000;


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // hbs engine
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
// app.get('', (req, res) => {
//     res.send("Hello express")
// })

// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> About Page </h1>');
// })
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Naveen'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Naveen'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helping text',
        title: 'Help',
        name: 'Naveen'
    })
})

app.get('/weather', (req, res) => {
    // console.log(req.query);
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    let search_text = encodeURIComponent(req.query.address);

    geocode(search_text, (error, {
        lat,
        lang,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        // console.log(data);
        forecast({
            lat,
            lang,
        }, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            console.log(forecast);

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naveen',
        text: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naveen',
        text: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up at port', port);
});