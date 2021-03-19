const router = require('express').Router();
// import user model
const { User } = require('../../models');
// import sign token function from auth
const { signToken } = require('../../utils/auth');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// 1. create a user, sign a token, then send it back to SignupForm.js component
// authMiddleware sends a token for verification of user
// 2. save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
router.route('/')
.post(async(req, res) => { // POST api/users/
    const { body } = req
    const user = await User.create(body);

    if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
}).put(authMiddleware, async(req, res) => { // PUT api/users/
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

// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body
router.route('/login').post(async(req, res) => {
    const { body } = req;
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
});

// get a single user by either their id or their username
router.route('/me').get(authMiddleware, async(req, res) => {
    const { user = null, params } = req;
    const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
});

// remove a book from `savedBooks`
router.route('/books/:bookId').delete(authMiddleware, async(req, res) => {
    const { user, params } = req;
    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { $pull: { savedBooks: { bookId: params.bookId } } }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
});

module.exports = router;