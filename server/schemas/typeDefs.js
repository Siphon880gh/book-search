const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
  }

  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String!
    link: String!
    title: String!
  }

  type BookFilm {
    _id: ID
    book: String!
    film: String
  }


  type Query {
    me: User
    users: [User]
    bookFilms: [BookFilm]
  }
`;

// TODO: When ready to implement Auth and user management
const typeDefs__Auth_User = gql `
  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

// TODO: When ready to implement users' book management
const typeDefs__BookManagement = gql `
  type Mutation {
    addBook(username: String!, authors: [String], description: String!, bookId: String!, image: String!, link: String!, title: String!): Book
    removeBook(username: String!, bookId: String!): Book
  }
`;

module.exports = typeDefs;