// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  addFoodToSells,
  viewNewOrders
  // updateRestaurant,
  // deleteRestaurant
} = require('../controllers/restaurants');

// map routes to controller
router
  .route('/')
  .get(getRestaurants)
  .post(createRestaurant);

router.route('/:rname/:start/:end')
  .get(getRestaurant)

router.route('/:rname')
  .post(addFoodToSells)

// .put(updateRestaurant)
// .delete(deleteRestaurant);

router.route('/:rname/orders')
  .get(viewNewOrders)

module.exports = router;