const express = require("express");
const router = express.Router();
var axios = require('axios');

const Weather = require("../models/Weather");

const isPrime = require('../utilities/Prime').isPrime;

const URL = 'https://samples.openweathermap.org/data/2.5/weather?id=2172796&appid=439d4b804bc8187953eb36d2a8c26a02';

//** GET */
router.get('/', (req, res) => {
    try {
        getDataFromAPI()
            .then(isPrime)
            .then(saveData)
            .then(resp => {
                if (resp.data.data.isPrime)
                    res.status(200).json({ data: resp.data.data.data });
                else
                    res.status(200).json({ data: resp.data.data });
            });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

const getDataFromAPI = () => {
    return new Promise((resolve, reject) => {
        axios.get(URL).then(response => {
            resolve(response.data);
        });
    });
}

const saveData = async (data) => {
    return new Promise(async (resolve, reject) => {
        const weather = new Weather({
            data: data.isPrime ? data.data : null,
            description: data.isPrime ? 'Date is prime' : 'Date is not prime'
        });
        try {
            const saveWeather = await weather.save();
            resolve({ saveWeather, data });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = router;