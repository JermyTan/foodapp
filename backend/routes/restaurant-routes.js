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

// router.route('/:rname?start=:start&end=:end')

// router.route('/:rname', function (req, res) {
//   var start = req.param('start');
//   var end = req.param('end');
//   res.send(req.params);
// }).get(getRestaurant)


router.route('/:rname')
  .post(addFoodToSells)
  .get(getRestaurant)


// .put(updateRestaurant)
// .delete(deleteRestaurant);

router.route('/:rname/orders')
  .get(viewNewOrders)

module.exports = router;
