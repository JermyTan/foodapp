const express = require('express');
const router = express.Router();

// import controllers here
const { 
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
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

module.exports = router;
