const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct
} = require('../controllers/productController');

// Product routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
