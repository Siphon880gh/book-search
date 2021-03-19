const db = require('../config/connection');
const { BookFilms } = require('../models');
const printf = require("util").format;

db.once('open', async() => {
    // Reset model
    await BookFilms.deleteMany({});

    // Create book-film adaptations
    const bookFilms = [];

    bookFilms.push({
        book: "Rapunzel",
        film: "Tangled (2010)"

    }, {
        book: "The Snow Queen",
        film: "Frozen (2013)"

    }, {

        book: "Northern Lights",
        film: "The Golden Compass (2007)"
    }, {

        book: "We Can Remember It For You Wholesale",
        film: "Total Recall (1990)"
    }, )

    await BookFilms.collection.insertMany(bookFilms);

    // Signal to developer that seeding finished
    const bgGreen = '\x1b[32m',
        colorReset = "\x1b[0m",
        queryHint = `
        
query {
    bookFilms {
        book
        film
    }
}`;

    console.info(printf('%sBookFilms all seeded for testing purposes! Run in GraphQL playground: %s'), bgGreen, queryHint, colorReset);
    process.exit(0);
});