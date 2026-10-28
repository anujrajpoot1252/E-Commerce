const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true }
    },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'COD' },
    status: { type: String, default: 'Placed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
