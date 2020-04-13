// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
    getPromotions,
    // getOrder,
    createPromotion,
    freeDeliveryPromo,
    orderDiscount
    // updateOrder,
    // deleteOrder
} = require('../controllers/promotions');

// map routes to controller
router
    .route('/')
    .get(getPromotions)
    // .post(createPromotion);
    .post(orderDiscount);

router.route('/:id')
    // .get(getOrder)
    .put(freeDeliveryPromo)
// .delete(deleteOrder);

module.exports = router;
