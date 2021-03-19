import gql from 'graphql-tag';

export const QUERY_FILM_ADAPTATIONS = gql`
query {
  bookFilms {
    book
		film
  }
}
`;