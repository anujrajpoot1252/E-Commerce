const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Order routes (Requires login)
router.post('/create', auth, createOrder);
router.get('/my-orders', auth, getMyOrders);
router.get('/:id', auth, getOrderById);
router.put('/cancel/:id', auth, cancelOrder);

module.exports = router;
