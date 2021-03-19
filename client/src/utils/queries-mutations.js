import gql from 'graphql-tag';

export const QUERY_FILM_ADAPTATIONS = gql `
query {
  bookFilms {
    book
	  film
  }
}`;

export const SAVE_BOOK = gql `
mutation saveBook($authors: [String], $description: String!, $title: String!, $bookId: String!, $image: String!, $link: String!) {
  saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
    User {
      username
      email
      savedBooks {
        Book {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
}`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

/**
 *
SAVE_BOOK Equivalent:

export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

router.route('/')
.put(authMiddleware, async(req, res) => { // PUT api/users/
    const { user, body } = req;
    console.log(user);
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { $addToSet: { savedBooks: body } }, { new: true, runValidators: true });
        return res.json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

  export const ADD_THOUGHT = gql`
    mutation addThought($thoughtText: String!) {
      addThought(thoughtText: $thoughtText) {
        _id
        thoughtText
        createdAt
        username
        reactionCount
        reactions {
          _id
        }
      }
    }
  `;


    addThought(thoughtText: String!): Thought

    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },


 */