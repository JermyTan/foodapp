// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
  // getStaffs,
  // getStaff,
  createManager,
  // updateCustomer,
  // deleteCustomer
} = require('../controllers/managers');

// map routes to controller
router
  .route('/')
  // .get(getStaffs)
  .post(createManager);

router.route('/:id')
// .get(getStaff)
// .put(updateCustomer)
//   .delete(deleteCustomer);

module.exports = router;
