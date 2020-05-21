// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    toggleActiveUser
} = require('../controllers/users');

// map routes to controller
router
    .route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .put(updateUser);

router.route('/active/toggle')
    .put(toggleActiveUser);

router.route('/login')
    .get(getUser);

module.exports = router;
