const router = require('express').Router();

// Import specific routes
const orderRoute = require('./order-routes');
const userRoute = require('./user-routes');

// map URI to file route
router.use('/orders', orderRoute);
router.use('/users', userRoute);

module.exports = router;
