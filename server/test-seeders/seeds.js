const db = require('../config/connection');
const { User, BookFilms } = require('../models');
const printf = require("util").format;

db.once('open', async() => {
    // Reset model
    await User.deleteMany({});
    await BookFilms.deleteMany({});

    // Create initial user for testing purposes

    await User.collection.insertOne({
            username: "test",
            email: "test@test.com",
            password: "test",
            savedBooks: []
    });

    /**
     equiv:

    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
     */


    // Create book-film adaptations
    await BookFilms.collection.insertMany([
        {
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
        }
    ]);

    // Signal to developer that seeding finished
    const bgGreen = '\x1b[32m',
        colorReset = "\x1b[0m",
        queryHint = `
        
query {
    bookFilms {
        book
        film
    }
}

Also, all users removed. Recreated user "test" with no saved books.
`;

    console.info(printf('%sBookFilms all seeded for testing purposes! Run in GraphQL playground: %s'), bgGreen, queryHint, colorReset);
    process.exit(0);
});