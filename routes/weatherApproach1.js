const express = require("express");
const router = express.Router();
var axios = require('axios');

const Weather = require("../models/Weather");

const URL = 'https://samples.openweathermap.org/data/2.5/weather?id=2172796&appid=439d4b804bc8187953eb36d2a8c26a02';

//** GET */
router.get('/', (req, res) => {
    try {
        axios.get(URL)
            .then(response => {
                const isPrime = getData(new Date(response.data.dt));
                if (isPrime)
                    res.status(200).json(response.data);
                else
                    res.status(200).json({ message: 'Date is not prime so no data' });
            })
            .catch(error => {
                res.status(500).json({ message: error });
            });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

getData = (date) => {
    const day = date.getDate();
    var i, flag = true;

    for (i = 2; i <= day - 1; i++)
        if (day % i == 0) {
            flag = false;
            break;
        }

    if (flag == true)
        return true;
    else
        return false;
}

module.exports = router;