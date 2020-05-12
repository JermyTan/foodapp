// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
  getRiders,
  getRider,
  createRider,
  getRiderRatings,
  getRiderOrders,
  getRiderSalary,
  getRiderSchedule,
  getProcessingOrders,
  getEligibleRiders,
  getSummaryInfo,
  updateRider,
  deleteRider
} = require('../controllers/riders');

// map routes to controller
router
  .route('/')
  .get(getRiders)
  .post(createRider);

router.route('/order')
  .get(getEligibleRiders)



router.route('/:id')
  .get(getRider)
  .put(updateRider)
  .delete(deleteRider);

router.route('/:id/ratings')
  .get(getRiderRatings);

router.route('/:id/orders')
  .get(getRiderOrders);

router.route('/:id/eligible-p-orders')
  .get(getProcessingOrders);

router.route('/:id/salary')
  .get(getRiderSalary);

router.route('/:id/schedule')
  .get(getRiderSchedule);
  
router.route('/:id/summary')
  .get(getSummaryInfo);

module.exports = router;
