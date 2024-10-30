const mongoose = require('mongoose');

const songschema = new mongoose.Schema({
    id: {type:Number,
        required: true,
        min:0,
    },
    name: {
        type:String,
    },
    type: {
        type:String,
    },
    singer: {
        type:String,
    },
    cost: {
        type:Number,
        min:0,
    },
    year: {
        type:Number,
        min:0,
    },
});

const Song = mongoose.model("Song", songschema);

module.exports = Song;