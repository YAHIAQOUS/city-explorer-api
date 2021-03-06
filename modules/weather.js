'use strict'

const axios = require('axios');
module.exports = weatherHandler;


// http://localhost:3006/weather?city=amman
// http://api.weatherbit.io/v2.0/current?&city=zarqa&key=API_KEY

let inMemory = {};

function weatherHandler(req, res) {
    let cityQuery = req.query.city;
    let key = process.env.WEATHER_KEY;
    // let key = '0744e560367343ae9d810f1723397ea4';
    let url = `http://api.weatherbit.io/v2.0/current?city=${cityQuery}&key=${key}`

    // lab09
    // axios
    //     .get(url)
    //     .then(result => {
    //         console.log('inside promise');
    //         let cityData = {
    //             description: result.data.data[0].weather.description,
    //             solarRad: result.data.data[0].solar_rad,
    //             windSpd: result.data.data[0].wind_spd,
    //             windDir: result.data.data[0].wind_dir,
    //             temp: result.data.data[0].temp
    //         }
    //         console.log(cityData);
    //         res.send(cityData);
    //     })
    //     .catch(err => {
    //         console.log('inside error');
    //         res.status(500).send(`error in getting data ==> ${err}`)
    //     })


    // lab10 Caching
    

    if (inMemory[cityQuery] != undefined) {
        console.log('Getting data from Memory');
        console.log(inMemory[cityQuery]);
        res.send(inMemory[cityQuery]);
    } else {
        console.log('Getting data from API');
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
                inMemory[cityQuery] = cityData;
                console.log(cityData);
                res.send(cityData);
            })
            .catch(err => {
                console.log('inside error');
                res.status(500).send(`error in getting data ==> ${err}`)
            })
    }
}
