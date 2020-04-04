// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
  // getStaffs,
  // getStaff,
  createStaff,
  // updateCustomer,
  // deleteCustomer
} = require('../controllers/staffs');

// map routes to controller
router
  .route('/')
  // .get(getStaffs)
  .post(createStaff);

router.route('/:id')
// .get(getStaff)
// .put(updateCustomer)
//   .delete(deleteCustomer);

module.exports = router;
