const router = require('express').Router();

// Import specific routes
const orderRoute = require('./order-routes');

// map URI to file route
router.use('/orders', orderRoute);

module.exports = router;
