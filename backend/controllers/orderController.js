const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// 1. Place Order (Checkout)
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = 'COD' } = req.body;
    const userId = req.user.id;

    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Check stock for every item
    for (let item of cart.items) {
      if (item.productId.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for: ${item.productId.name}`
        });
      }
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity
    }));

    // Save new order
    const order = new Order({
      userId,
      items: orderItems,
      shippingAddress,
      totalAmount: cart.totalPrice,
      paymentMethod
    });
    await order.save();

    // Deduct stock from products
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear cart after order is placed
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get my orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get single order by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Cancel order and restore stock
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    // Update status
    order.status = 'Cancelled';
    await order.save();

    // Add stock back to products
    for (let item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity }
      });
    }

    res.json({ message: 'Order cancelled and stock restored', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
};
