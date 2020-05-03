// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
  getRiders,
  // getRider,
  createRider,
  // updateCustomer,
  // deleteCustomer
} = require('../controllers/riders');

// map routes to controller
router
  .route('/')
  .get(getRiders)
  .post(createRider);

// router.route('/:id')
// .get(getCustomer)
// .put(updateCustomer)
//   .delete(deleteCustomer);

module.exports = router;
