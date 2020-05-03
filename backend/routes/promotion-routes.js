// const express = require('express');
// const router = express.Router();

// Router with middleware to return promises: https://node-postgres.com/guides/async-express
const Router = require('express-promise-router');
const router = new Router();

// import controllers here
const {
    getFDSPromotions,
    // getOrder,
    createFDSPromotion,
    // freeDeliveryPromo,
    orderDiscount,
    getCustomers,
    getRPromotions,
    createRPromotion
} = require('../controllers/promotions');

// map routes to controller
router
    .route('/')
    .get(getFDSPromotions)
    .post(createFDSPromotion);
// .post(orderDiscount);

router.route('/:rname')
    .get(getRPromotions)
    .post(createRPromotion);
// .delete(deleteOrder);

router.route('/customers')
    .get(getCustomers)

module.exports = router;
