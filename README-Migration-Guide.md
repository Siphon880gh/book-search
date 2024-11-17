# Migration Guide

To make the app user friendly on a mixed VPS / Dedicated Server (mixed as in it can support php, nodejs, AND python) which helps reduce costs, reverse proxy is used to pass a friendly url's request to an internal port.

Database: Adjust the MONGODB_URI at the .env file for authenticating and accessing your Mongo database.

Ports: This CRA needs its own unique port so it won't conflict with your other CRA apps on this same server. This GraphQL also needs its own unique port from other GraphQL apps on this same server. Relatedly, GraphQL also needs its own unique api endpoint url from other GraphQL's on this same server. More on this at the next section.

Base URL - Here's how you replace the baseURL for this app:
- N/A: grep for `...` and replace with your new baseURL. Or you may use sed to match and replace.

Reverse Proxies: 
- `/app/book-search[/]*` proxy passes to `127.0.0.1:PORT` where PORT is the unique CRA React port.
- `/graphql-book-search[/]*` proxy passes to `127.0.0.1:PORT_GRAPHQL` where PORT_GRAPHQL is the unique GraphQL port.

---

CRA React Port, GraphQL Port, Graphql API Endpoint


Say the file structure for the most part is:
./client which uses cra react and its own package.json
./server which uses graphql, minimum express endpoints, and its own package.json
package.json at the root folder

If you have multiple react apps and graphql apps, you have to manage the react port and graphql port AND graphql url (assign a custom endpoint other than the default /graphql )

At cra client/, it by default assigns 3000 or a higher number, but you should pre-assign a  port at client/.env  with PORT=3002 , for example. This seems like a very generic convention using PORT as the variable but unfortunately CRA has chosen it. The .env file must be at the same level where the package.json for cra is at and the variable must be PORT , so that file could be at client/.env  with the line PORT=3002 , for example.

For graphql, you may need to assign a discretionary PORT at server/server.js . To streamline managing multiple graphql apps, you can assign a PORT_GRAPHQL  at the root .env  file (outside of server/ folder) while your server/server.js ‘s dotenv process can go up a folder into the root to look into the .env:
require('dotenv').config({ path: '../.env' });

//...

const PORT = process.env.PORT_GRAPHQL || 3001;


And your cra frontend needs to proxy into that GraphQL server port, otherwise the browser will block by CORS. CRA reads package.json for proxy, so your client/package.json  could have "proxy": "http://localhost:3003", 

You need to be discriminating on the /graphql api endpoint at both the cra frontend AND at the server.js.. make sure they both match though:
server/server.js:
// Set a custom GraphQL path for this server
// server.applyMiddleware({ app });
server.applyMiddleware({ app, path: '/graphql-book-search' });

client/src/App.js:
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  // uri: '/graphql'
  uri: '/graphql-book-search'
});
