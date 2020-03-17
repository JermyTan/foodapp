// @desc    Get all orders
// @route   GET /orders
// @acess   Public
exports.getOrders = (req, res, next) => {
    res.status(200).json({ success : true, msg : 'show all orders'})
}

// @desc    Get single orders
// @route   GET /orders/:id
// @acess   Public
exports.getOrder = (req, res, next) => {
    res.status(200).json({ success : true, msg : `Get order ${req.params.id}` })
}

// @desc    Create new order
// @route   POST /orders
// @acess   Private
exports.createOrder = (req, res, next) => {
    res.status(200).json({ success : true, msg : 'Create new orders'})
}

// @desc    Update new order
// @route   PUT /orders/:id
// @acess   Private
exports.updateOrder = (req, res, next) => {
    res.status(200).json({ success : true, msg : `Update order ${req.params.id}` })
}

// @desc    Delete order
// @route   DELETE /orders/:id
// @acess   Private
exports.deleteOrder = (req, res, next) => {
    res.status(200).json({ success : true, msg : `Delete order ${req.params.id}` })
}
