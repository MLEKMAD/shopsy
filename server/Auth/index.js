const router = require('express').Router();
const signIn = require('./db').signIn;
const signUp = require('./db').signUp;

router.post('/sign-in', (req, res) => {
    //Return a user or an error.
    const { body: { email, password } } = req;
    signIn(email, password, (user) => {
        if (user == null) {
            res
                .status(401)
                .json({ error: 'Failed Login' });
        } else {
            res
                .status(200)
                .json(user);
        }
    });
});

router.post('/sign-up', (req, res) => {
    //Sign up a user
    const { body: { email, password } } = req;
    signUp(email, password, (user) => {
        if (user == null) {
            res
                .status(500)
                .json({ error: 'Failed sign up' });
        } else {
            res
                .status(200)
                .json(user);
        }
    });
});

module.exports = router;