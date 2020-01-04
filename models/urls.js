const mongoose = require('mongoose');

let urlSchema = new mongoose.Schema({
    href: String,
    total: Number,
    parameters: Array
});

let Url = mongoose.model('Url' , urlSchema);

module.exports = Url;