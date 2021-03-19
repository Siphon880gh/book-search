const { BookFilms, User } = require('../models');

// TODO: When ready to implement Auth and user management
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            return { error: "Not implemented yet" };
        },
        bookFilms: async() => {
            return await BookFilms.find({}).select("-__v");
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        login: async(parent, { email, password }) => {

            // Find if email exists
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('That user does not exist');
            }

            // See if plain passwords match
            if (password !== user.password) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // Then sign the token, aka combine user identifiers and exp to generate a JWT
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async(parent, args, context) => {
            if (context.user) {
                // const user = await Thought.create({...args, username: context.user.username });
                console.log("* ARGS: " + args);
                console.log("* CONTEXT: " + context);

                const book = args; // {authors:.., description:.., title:.., bookId:.., image:.., link:..}

                await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { savedBooks: book } }, { new: true });

                return User;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

// TODO: When ready to implement users' book management
const resolvers__BookManagement = {

    Mutation: {
        removeBook: async(parent, args, context) => {
            return { error: "Not implemented yet" };
        }
    }
}

module.exports = resolvers;