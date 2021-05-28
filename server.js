'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const JSONData = require('./data/weather.json');

const server = express();
server.use(cors());    //make server opened for anyone
const PORT = process.env.PORT;




// http://localhost:3006/test
server.get('/test', (req, res) => {
    res.status(200).send('hello from back end');
})

// lab07
// http://localhost:3006/weather?cityName=amman
// server.get('/weather', (req, res) => {

//     let weatherItem = JSONData.find(item => {
//         if (item.city_name.toLowerCase() == req.query.cityName)
//             return item;
//     })

//     let weatherArray = [];
//     for (let i = 0; i < weatherItem.data.length; i++) {
//         let cityData = {
//             description: weatherItem.data[i].weather.description,
//             date: weatherItem.data[i].valid_date
//         }
//         weatherArray.push(cityData)
//     }

//     res.status(200).send(weatherArray);
// })



// lab08
// http://localhost:3006/weather?city=amman
// http://api.weatherbit.io/v2.0/current?&city=zarqa&key=API_KEY
server.get('/weather', weatherHandler)

function weatherHandler(req, res) {
    let cityQuery = req.query.city;
    // let key = process.env.API_KEY;
    let key = '0744e560367343ae9d810f1723397ea4';
    let url = `http://api.weatherbit.io/v2.0/current?city=${cityQuery}&key=${key}`

    axios
        .get(url)
        .then(result => {
            console.log('inside promise');
            let cityData = {
                description: result.data.data[0].weather.description,
                solarRad: result.data.data[0].solar_rad,
                windSpd: result.data.data[0].wind_spd,
                windDir: result.data.data[0].wind_dir,
                temp: result.data.data[0].temp
            }
            console.log(cityData);
            res.send(cityData);
        })
        .catch(err => {
            console.log('inside error');
            res.status(500).send(`error in getting data ==> ${err}`)
        })
}


// http://localhost:3006/movies?city=amman
// https://api.themoviedb.org/3/search/movie?api_key=2f572ab958bab1048cb95a108203162a&query=amman
server.get('/movies', moviesHandler)

function moviesHandler(req, res) {
    let cityQuery = req.query.city;
    // let key = process.env.API_KEY;
    let key = '2f572ab958bab1048cb95a108203162a';
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query==${cityQuery}`

    axios
        .get(url)
        .then(result => {
            console.log('inside promise');
            let cityData = result.data.results.map(movieItem => {
                return new Movie(movieItem)
            })
            console.log(cityData);
            res.send(cityData);
        })
        .catch(err => {
            console.log('inside error');
            res.status(500).send(`error in getting data ==> ${err}`)
        })
}

class Movie {
    constructor(item) {
        this.title = item.title,
            this.overview = item.overview,
            this.average_votes = item.vote_average,
            this.total_votes = item.vote_count,
            this.image_url = item.poster_path,
            this.popularity = item.popularity,
            this.released_on = item.release_date
    }
}




server.get('*', (req, res) => {
    res.send('Error: Something went wrong.');
})

server.listen(PORT, () => {
    console.log('Server Listining');
})