import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Container, Card, CardColumns, Figure } from 'react-bootstrap';

import { useQuery } from '@apollo/react-hooks'; // TO REVIEW
import { QUERY_FILM_ADAPTATIONS } from '../utils/queries-mutations';

// Test GraphQL without ApolloProvider initially. Comment off once I implement ApolloProvider
// const fetch = require('node-fetch');

const TestBookFilms = () => {

    /* 
     * @hook
     * Test GraphQL without ApolloProvider initially
     * Comment off state and useEffect once I implement ApolloProvider
     * Side effet: The useEffect hook does not accept async fxns, so as a consequence, I use IIFE
     */ 
    // const [bookFilms, setBookFilms] = useState([]);
    // useEffect(() => {
        // (async function() {
        //     const retBookFilms = await fetch('http://localhost:3001/graphql', {
        //         method: 'POST',
        //         headers: {
        //             'Accept-Encoding': 'gzip, deflate, br',
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             'Connection': 'keep-alive',
        //             'DNT': '1',
        //             'Origin': 'http://localhost:3001'
        //         },
        //         body: JSON.stringify({ "query": "query {\n bookFilms {\n book\n\t\tfilm\n }\n}" })
        //     }).then(res => res.json()).then(data => { return data });

        //     if (retBookFilms) {
        //         let { bookFilms } = retBookFilms.data;
        //         setBookFilms(bookFilms);

        //     }
        // })(); // IIFE
    // }, []); // useEffect


    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_FILM_ADAPTATIONS);
    const bookFilms = data?.bookFilms || [];

    return (<React.Fragment>
      {loading?(
        <div>Loading...</div>
      ) : (
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
      )
      }
      </React.Fragment>);
};

export default TestBookFilms;