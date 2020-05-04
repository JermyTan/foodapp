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
  getCustomerOrders,
  addOrderReview,
  addOrderRating,
  updateCustomerCard
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
  .put(updateCustomerCard)
//   .delete(deleteCustomer);

router.route('/:id/orders')
  .get(getCustomerOrders)

router.route('/review')
  .post(addOrderReview)

router.route('/rating')
  .post(addOrderRating)

module.exports = router;
