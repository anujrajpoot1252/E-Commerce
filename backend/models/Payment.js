const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    paymentGateway: {
      type: String,
      enum: ['COD', 'Stripe', 'Razorpay', 'PayPal', 'Manual'],
      default: 'COD'
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Card', 'UPI', 'NetBanking', 'Wallet'],
      default: 'COD'
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Success', 'Failed', 'Refunded'],
      default: 'Pending',
      index: true
    },
    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    paidAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
