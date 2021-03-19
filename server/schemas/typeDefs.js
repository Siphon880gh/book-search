const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String
  }

  type BookFilm {
    _id: ID
    book: String!
    film: String
  }

  type Query {
    me: User
    bookFilms: [BookFilm]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String!, link: String): User
    removeBook(bookId: String!): User
  }
`;


// TODO: When ready to implement users' book management
const typeDefs__BookManagement = gql `
  type Mutation {
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;