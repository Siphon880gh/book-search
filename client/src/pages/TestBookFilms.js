import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Figure } from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveBook, searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

// Test GraphQL without ApolloProvider. Comment off once you implement ApolloProvider
const fetch = require('node-fetch');

const TestBookFilms = () => {
    // create state for holding book film adaptations
    const [bookFilms, setBookFilms] = useState([]);

    // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {

        // Comment off once you implement ApolloProvider
        // useEffect does not accept async fxns, so as a consequence, you use IIFE
        (async function() {

            const retBookFilms = await fetch('http://localhost:3001/graphql', {
                method: 'POST',
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Connection': 'keep-alive',
                    'DNT': '1',
                    'Origin': 'http://localhost:3001'
                },
                body: JSON.stringify({ "query": "query {\n bookFilms {\n book\n\t\tfilm\n }\n}" })
            }).then(res => res.json()).then(data => { return data });

            if (retBookFilms) {
                let { bookFilms } = retBookFilms.data;
                setBookFilms(bookFilms);

            }
        })();
    }, []); // useEffect

    return ( 
      <Container>
        <h2>
          {bookFilms.length
            ? `Viewing ${bookFilms.length} film adaptations:`
            : 'Please seed the test first.'}
        </h2>
        {
          bookFilms.length
            ? <Figure><Figure.Caption>This is a <b>demo</b>. In a future version, we'll have film adaptations for all Google books and links to purchase their Google Play movie:</Figure.Caption></Figure>
            : ''
        }
        <CardColumns>
          {bookFilms.map((bookFilm, itrIndex) => {
            return (
              <Card key={itrIndex} border='dark'>
                <Card.Body>
                  <Card.Title>{bookFilm.book}</Card.Title>
                  <Card.Text>Film Adaptation: {bookFilm.film}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    );
};

export default TestBookFilms;