const { BookFilms, User } = require('../models');

// TODO: When ready to implement Auth and user management
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                // const user = await Thought.create({...args, username: context.user.username });
                // console.log("* ARGS: " + args);
                // console.log("* CONTEXT: " + context);

                const foundUser = await (await User.findOne({ _id: context.user._id })).select("-password -savedBooks -bookCount");
                return foundUser;
            }

            throw new AuthenticationError('You need to be logged in!');
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
            // Testable:
            // Switch comment on/of depending on if you are testing in graphQL playground where you don't want a logged in user. 
            // Then it'd use the seed user "test"

            // if (true ) {
            if ( context.user) {
                const book = args; // {authors:.., description:.., title:.., bookId:.., image:.., link:..}

                // const updatedUser = await User.findOneAndUpdate({ username: "test" }, { $push: { savedBooks: book } }, { new: true });
                const updatedUser = await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { savedBooks: book } }, { new: true });
                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }, // saveBook

        removeBook: async(parent, args, context) => {
            // Testable:
            // Switch comment on/of depending on if you are testing in graphQL playground where you don't want a logged in user. 
            // Then it'd use the seed user "test"

            // if (true ) {
            if ( context.user) {
                const {bookId} = args; // {authors:.., description:.., title:.., bookId:.., image:.., link:..}

                // const updatedUser = await User.findOneAndUpdate({ username: "test" }, 
                // { 
                //     $pull: {
                //         savedBooks: {
                //             bookId
                //         }
                //     } 
                // }, { new: true });
                // return updatedUser;

                const updatedUser = await User.findByIdAndUpdate({ _id: context.user._id }, 
                { 
                    $pull: {
                        savedBooks: {
                            bookId
                        }
                    } 
                }, { new: true });
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');

        } // removeBook

    } // Mutation
};

module.exports = resolvers;