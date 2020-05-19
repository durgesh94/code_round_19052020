var assert = require('assert');
const isPrime = require('../utilities/Prime').isPrime;
const Weather = require("../models/Weather");

describe('isPrime', () => {
    it('isPrime should return true for prime number. Else it should return false', () => {
        assert.equal(true, isPrime(3));
    });
    it('isPrime should return true for prime number. Else it should return false', () => {
        assert.equal(false, isPrime(10));
    });
});

describe('Weather', function () {
    describe('#save()', function () {
        it('should save without error', function (done) {
            var weather = new Weather({
                data: 'test',
                description: 'Date is not prime'
            });
            weather.save((done))
        });
    });
});