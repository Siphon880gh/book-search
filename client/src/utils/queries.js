import gql from 'graphql-tag';

export const GET_ME = gql`
query {
  me {
    _id
    username
    email
    savedBooks {
      authors
      description
      title
      bookId
      image
      link   
    }  
  }
}`;

export const QUERY_FILM_ADAPTATIONS = gql`
query bookfilmie {
  bookFilms {
    book
	  film
  }
}`;