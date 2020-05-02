const router = require('express').Router();

// Import specific routes
const orderRoute = require('./order-routes');
const userRoute = require('./user-routes');
const customerRoute = require('./customer-routes');
const restaurantRoute = require('./restaurant-routes');
const staffRoute = require('./staff-routes');
const riderRoute = require('./rider-routes');
const managerRoute = require('./manager-routes');
const promotionRoute = require('./promotion-routes');

// map URI to file route
router.use('/orders', orderRoute);
router.use('/users', userRoute);
router.use('/customers', customerRoute);
router.use('/restaurants', restaurantRoute);
router.use('/staffs', staffRoute);
router.use('/riders', riderRoute);
router.use('/managers', managerRoute);
router.use('/promotions', promotionRoute);

module.exports = router;
