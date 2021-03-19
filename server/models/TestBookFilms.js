/**
 * @file TestBookFilms.js
 * 
 * This is a model for testing purposes. It will be seeded so we can test graphQL works in early development
 * The model will be a list of books that were adapted to film
 */

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const bookFilmSchema = new Schema({
    book: {
        type: String,
        required: true,
        unique: true,
    },
    film: {
        type: String,
        required: false,
        unique: false,
    }
});

const BookFilm = model('BookFilm', bookFilmSchema);

module.exports = BookFilm;