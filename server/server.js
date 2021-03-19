// Modules
const express = require('express');
// const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express'); // Apollo has server and client libraries
const path = require('path');

// Server dependencies
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

// Server
const PORT = process.env.PORT || 3001;
const app = express();

// - Apollo server library
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware // TODO: When Auth
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("MODE:" + process.env.NODE_ENV);

// Serve client/build as static assets if we're in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// // Other URIs serve the frontend homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});