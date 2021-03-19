const { BookFilm } = require('../models');

// TODO: When ready to implement Auth and user management
// const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            return { error: "Not implemented yet" };
        },
        users: async() => {
            return { error: "Not implemented yet" };
        },
        bookFilms: async() => {
            return [{ book: "Error: Not implemented yet", film: "Error: Not implemented yet" }];
        }
    }
};

// TODO: When ready to implement Auth and user management
const resolvers__Auth_User = {
    Mutation: {
        login: async(parent, { email, password }) => {
            return { error: "Not implemented yet" };
        },
        addUser: async(parent, args) => {
            return { error: "Not implemented yet" };
        }
    }
}

// TODO: When ready to implement users' book management
const resolvers__BookManagement = {

    Mutation: {
        addBook: async(parent, args, context) => {
            return { error: "Not implemented yet" };
        },
        removeBook: async(parent, args, context) => {
            return { error: "Not implemented yet" };
        }
    }
}

module.exports = resolvers;