// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    // getEligibleRiders
} = require('../controllers/orders');

// map routes to controller
router
    .route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/:id')
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

// router.route('/:id/eligible-riders')
//     .get(getEligibleRiders);

module.exports = router;
