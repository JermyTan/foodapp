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
  getGeneralCustomerSummary,
  // getGeneralOrderSummaryFiltered,
  getGeneralOrderSummary,
  getGeneralRiderSummary,
  getGeneralSummary
  // deleteCustomer
} = require('../controllers/managers');

// map routes to controller
router
  .route('/')
  // .get(getStaffs)
  .post(createManager);

router.route('/summary/customers')
  .get(getGeneralCustomerSummary);
// .put(updateCustomer)
//   .delete(deleteCustomer);

// router.route('/summary/orders/filtered')
//   .get(getGeneralOrderSummaryFiltered);

router.route('/summary/orders')
  .get(getGeneralOrderSummary);

router.route('/summary/riders')
  .get(getGeneralRiderSummary);

router.route('/summary/general')
  .get(getGeneralSummary);

module.exports = router;