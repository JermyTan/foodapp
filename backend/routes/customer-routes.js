// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
  getCustomers,
  getCustomer,
  createCustomer,
  getCustomerOrders
  // updateCustomer,
  // deleteCustomer
} = require('../controllers/customers');

// map routes to controller
router
  .route('/')
  .get(getCustomers)
  .post(createCustomer);

router.route('/:id')
  .get(getCustomer)
// .put(updateCustomer)
//   .delete(deleteCustomer);

router.route('/:id/orders')
  .get(getCustomerOrders)

module.exports = router;
