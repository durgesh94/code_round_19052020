const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
    data: {
        type: Object,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Weathers', weatherSchema);