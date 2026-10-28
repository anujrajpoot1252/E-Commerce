const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const auth = require('../middleware/auth');

// Cart routes (Requires login)
router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.delete('/remove/:productId', auth, removeFromCart);
router.delete('/clear', auth, clearCart);

module.exports = router;
