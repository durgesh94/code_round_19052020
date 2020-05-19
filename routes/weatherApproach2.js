const express = require("express");
const router = express.Router();
var axios = require('axios');

const Weather = require("../models/Weather");

const URL = 'https://samples.openweathermap.org/data/2.5/weather?id=2172796&appid=439d4b804bc8187953eb36d2a8c26a02';

//** GET */
router.get('/', (req, res) => {
    try {
        getDataFromAPI()
            .then(findPrimeDate)
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

getDataFromAPI = () => {
    return new Promise((resolve, reject) => {
        axios.get(URL).then(response => {
            resolve(response.data);
        });
    });
}

findPrimeDate = (data) => {
    return new Promise((resolve, reject) => {
        const date = new Date(data.dt);
        const day = date.getDate();
        var i, flag = true;

        for (i = 2; i <= day - 1; i++)
            if (day % i == 0) {
                flag = false;
                break;
            }

        if (flag == true)
            resolve({ isPrime: true, data: data });
        else
            resolve({ isPrime: false, data: 'Date is not prime so no data' });
    })
}

saveData = async (data) => {
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