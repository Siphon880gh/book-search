import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import TestBookFilms from './pages/TestBookFilms';
import Navbar from './components/Navbar';

// Add Apollo context components
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
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

function App() {
  const basepath = process.env.REACT_APP_REACT_ROUTER_BASEPATH || '/';

  return (
    <ApolloProvider client={client}>
      <Router basename={basepath}>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/test' component={TestBookFilms} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;



