const mongoose = require('mongoose');
const { generatePath } = require('react-router-dom');

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    genre:String,
    publisher: String,
    pages: Number
});

module.exports = mongoose.model('Book', bookSchema);