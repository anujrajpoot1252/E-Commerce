/**
 * E-Commerce Person 2 Logic Live Demo
 * Products -> Cart -> Orders -> Stock Management
 */

// 1. In-Memory Database (Products)
const database = {
  products: [
    { id: 'p1', name: 'Wireless Headphones', price: 1999, category: 'Electronics', stock: 10 },
    { id: 'p2', name: 'Smart Fitness Watch', price: 2999, category: 'Electronics', stock: 5 },
    { id: 'p3', name: 'Cotton Casual T-Shirt', price: 499, category: 'Clothing', stock: 20 },
    { id: 'p4', name: 'Gaming Mouse RGB', price: 899, category: 'Accessories', stock: 2 }
  ],
  cart: {
    userId: 'user_101',
    items: [],
    totalPrice: 0
  },
  orders: []
};

// Helper: Calculate total
function updateCartTotal() {
  database.cart.totalPrice = database.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}


// 1. PRODUCT LOGIC: Search products
function searchProducts(keyword) {
  console.log(`\n [STEP 1] Searching products with keyword: "${keyword}"...`);
  const results = database.products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );
  console.table(results);
  return results;
}

// 2. CART LOGIC: Add to Cart with Stock Verification
function addToCart(productId, quantity) {
  console.log(`\n[STEP 2] Adding to cart: Product ID "${productId}", Quantity: ${quantity}...`);
  const product = database.products.find((p) => p.id === productId);

  if (!product) {
    console.log(` Error: Product not found!`);
    return false;
  }

  // Stock check
  if (product.stock < quantity) {
    console.log(` Error: Out of stock! Available stock is only ${product.stock}.`);
    return false;
  }

  // Check if already in cart
  const existingItem = database.cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      console.log(`Error: Cannot add more! Available stock is ${product.stock}, already in cart: ${existingItem.quantity}.`);
      return false;
    }
    existingItem.quantity += quantity;
  } else {
    database.cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity
    });
  }

  updateCartTotal();
  console.log(`Success: Added "${product.name}" to cart.`);
  console.log(`Current Cart Total: ${database.cart.totalPrice}`);
  console.table(database.cart.items);
  return true;
}

// 3. ORDER LOGIC: Checkout & Place Order
function createOrder(shippingAddress) {
  console.log(`\n [STEP 3] Placing Order (Checkout)...`);

  if (database.cart.items.length === 0) {
    console.log(` Error: Cannot checkout an empty cart!`);
    return null;
  }

  // Final Live Stock Check
  for (const item of database.cart.items) {
    const liveProduct = database.products.find((p) => p.id === item.productId);
    if (!liveProduct || liveProduct.stock < item.quantity) {
      console.log(` Error: Insufficient stock for ${item.name}!`);
      return null;
    }
  }

  // Create Order Object
  const orderId = `ORD-${Date.now().toString().slice(-4)}`;
  const order = {
    orderId,
    userId: database.cart.userId,
    items: JSON.parse(JSON.stringify(database.cart.items)),
    totalAmount: database.cart.totalPrice,
    shippingAddress,
    status: 'Placed',
    createdAt: new Date().toLocaleTimeString()
  };

  database.orders.push(order);

  // DEDUCT INVENTORY STOCK
  for (const item of order.items) {
    const liveProduct = database.products.find((p) => p.id === item.productId);
    liveProduct.stock -= item.quantity;
    console.log(`📉 Stock Updated: "${liveProduct.name}" remaining stock = ${liveProduct.stock}`);
  }

  // CLEAR CART AFTER ORDER
  database.cart.items = [];
  database.cart.totalPrice = 0;
  console.log(`🧹 Cart auto-cleared after successful order.`);

  console.log(`\n🎉 Order Created Successfully!`);
  console.log(JSON.stringify(order, null, 2));
  return order;
}

// 4. ORDER LOGIC: Cancel Order & Restore Stock
function cancelOrder(orderId) {
  console.log(`\n❌ [STEP 4] Cancelling Order: "${orderId}"...`);
  const order = database.orders.find((o) => o.orderId === orderId);

  if (!order) {
    console.log(`❌ Error: Order not found!`);
    return false;
  }

  if (order.status === 'Cancelled') {
    console.log(`⚠️ Warning: Order is already cancelled!`);
    return false;
  }

  order.status = 'Cancelled';

  // RESTORE STOCK BACK TO INVENTORY
  for (const item of order.items) {
    const liveProduct = database.products.find((p) => p.id === item.productId);
    if (liveProduct) {
      liveProduct.stock += item.quantity;
      console.log(`📈 Stock Restored: "${liveProduct.name}" stock restored to = ${liveProduct.stock}`);
    }
  }

  console.log(`✅ Order status updated to "${order.status}".`);
  return true;
}

// ==========================================
// RUNNING THE COMPLETE FLOW LIVE
// ==========================================
console.log('====================================================');
console.log('   🚀 SHOP-EASE: PERSON 2 BUSINESS LOGIC DEMO');
console.log('====================================================');

// 1. Initial Products
console.log('\n--- INITIAL PRODUCTS IN STORE ---');
console.table(database.products);

// 2. Search
searchProducts('watch');

// 3. Add to cart
addToCart('p1', 2); // 2 Headphones
addToCart('p2', 1); // 1 Watch

// 4. Test Stock Validation (Fail scenario)
console.log('\n⚠️ [TESTING VALIDATION] Trying to add 5 Gaming Mice (only 2 in stock)...');
addToCart('p4', 5);

// 5. Checkout
const myOrder = createOrder({
  address: '42 Nehru Nagar',
  city: 'Jaipur',
  phone: '9876543210'
});

// 6. View Products Stock after checkout
console.log('\n--- PRODUCTS STOCK AFTER ORDER ---');
console.table(database.products);

// 7. Cancel Order and verify stock restoration
if (myOrder) {
  cancelOrder(myOrder.orderId);
  console.log('\n--- PRODUCTS STOCK AFTER CANCELLATION (RESTORED) ---');
  console.table(database.products);
}

console.log('\n====================================================');
console.log('   ✅ DEMO FINISHED SUCCESSFULLY!');
console.log('====================================================');
