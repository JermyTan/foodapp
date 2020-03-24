const router = require('express').Router();

// Import specific routes
const orderRoute = require('./order-routes');
const userRoute = require('./user-routes');
const customerRoute = require('./customer-routes');

// map URI to file route
router.use('/orders', orderRoute);
router.use('/users', userRoute);
router.use('/customers', customerRoute);

module.exports = router;
