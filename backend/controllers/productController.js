const Product = require('../models/Product');

// 1. Get all products (with optional search)
const getProducts = async (req, res) => {
  try {
    const search = req.query.search || '';
    const products = await Product.find({
      name: { $regex: search, $options: 'i' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Add new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct
};
