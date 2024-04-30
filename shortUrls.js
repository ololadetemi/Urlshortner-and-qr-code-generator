const mongoose = require('mongoose');
//const { nanoid } = require('nanoid');
//const shortId = nanoid();
const shortUUID = require('short-uuid');

//const shortId = shortUUID.generate();



const shorturlschema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortUUID.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    customSlug: {
        type: String,
        unique: true,
        sparse: true
    },
    customDomain: String
})

module.exports = mongoose.model('shortUrl', shorturlschema );