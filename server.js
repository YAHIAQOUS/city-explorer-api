'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const JSONData = require('./data/weather.json');

const server = express();
server.use(cors());    //make server opened for anyone
const PORT = process.env.PORT;


// http://localhost:3006/test
server.get('/test', (req, res) => {
    res.status(200).send('hello from back end');
})


// http://localhost:3006/weather?cityName=amman
server.get('/weather', (req, res) => {

    let weatherItem = JSONData.find(item => {
        if (item.city_name.toLowerCase() == req.query.cityName)
            return item;
    })

    let weatherArray = [];
    for (let i = 0; i < weatherItem.data.length; i++) {
        let cityData = {
            description: weatherItem.data[i].weather.description,
            date: weatherItem.data[i].valid_date
        }
        weatherArray.push(cityData)
    }

    res.status(200).send(weatherArray);
})


server.get('*', (req, res) => {
    res.send('Error: Something went wrong.');
})



server.listen(PORT, () => {
    console.log('Server Listining');
})