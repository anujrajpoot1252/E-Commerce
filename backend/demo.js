/**
 * ShopEase Business Logic Simulation
 * Products -> Cart -> Orders -> Stock Management
 */

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

function updateCartTotal() {
  database.cart.totalPrice = database.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function searchProducts(keyword) {
  console.log(`\n[Search] Keyword: "${keyword}"`);
  const results = database.products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );
  console.table(results);
  return results;
}

function addToCart(productId, quantity) {
  console.log(`\n[Cart] Adding Product ID "${productId}", Quantity: ${quantity}`);
  const product = database.products.find((p) => p.id === productId);

  if (!product) {
    console.log(`[Cart] Error: Product not found.`);
    return false;
  }

  if (product.stock < quantity) {
    console.log(`[Cart] Error: Insufficient stock. Available: ${product.stock}.`);
    return false;
  }

  const existingItem = database.cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      console.log(`[Cart] Error: Requested quantity exceeds available stock (${product.stock}). In cart: ${existingItem.quantity}.`);
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
  console.log(`[Cart] Added "${product.name}". Cart Total: ₹${database.cart.totalPrice}`);
  console.table(database.cart.items);
  return true;
}

function createOrder(shippingAddress) {
  console.log(`\n[Order] Initiating Checkout...`);

  if (database.cart.items.length === 0) {
    console.log(`[Order] Error: Cart is empty.`);
    return null;
  }

  for (const item of database.cart.items) {
    const liveProduct = database.products.find((p) => p.id === item.productId);
    if (!liveProduct || liveProduct.stock < item.quantity) {
      console.log(`[Order] Error: Insufficient stock for ${item.name}.`);
      return null;
    }
  }

  const orderId = `ORD-${Date.now().toString().slice(-4)}`;
  const order = {
    orderId,
    userId: database.cart.userId,
    items: JSON.parse(JSON.stringify(database.cart.items)),
    totalAmount: database.cart.totalPrice,
    shippingAddress,
    status: 'Placed',
    createdAt: new Date().toLocaleTimeString('en-US', { hour12: false })
  };

  database.orders.push(order);

  for (const item of order.items) {
    const liveProduct = database.products.find((p) => p.id === item.productId);
    liveProduct.stock -= item.quantity;
    console.log(`[Inventory] Stock updated for "${liveProduct.name}". Remaining: ${liveProduct.stock}`);
  }

  database.cart.items = [];
  database.cart.totalPrice = 0;
  console.log(`[Cart] Cart cleared after successful order.`);
  console.log(`[Order] Order ${orderId} created successfully:`);
  console.log(JSON.stringify(order, null, 2));
  return order;
}

function cancelOrder(orderId) {
  console.log(`\n[Order] Cancelling Order: "${orderId}"`);
  const order = database.orders.find((o) => o.orderId === orderId);

  if (!order) {
    console.log(`[Order] Error: Order not found.`);
    return false;
  }

  if (order.status === 'Cancelled') {
    console.log(`[Order] Notice: Order is already cancelled.`);
    return false;
  }

  order.status = 'Cancelled';

  for (const item of order.items) {
    const liveProduct = database.products.find((p) => p.id === item.productId);
    if (liveProduct) {
      liveProduct.stock += item.quantity;
      console.log(`[Inventory] Stock restored for "${liveProduct.name}". Current stock: ${liveProduct.stock}`);
    }
  }

  console.log(`[Order] Status updated to "${order.status}".`);
  return true;
}

// Execution flow
console.log('----------------------------------------------------');
console.log('ShopEase Business Logic Simulation');
console.log('----------------------------------------------------');

console.log('\nInitial Products:');
console.table(database.products);

searchProducts('watch');
addToCart('p1', 2);
addToCart('p2', 1);

console.log('\nValidation Check (Adding 5 Gaming Mice when 2 are in stock):');
addToCart('p4', 5);

const myOrder = createOrder({
  address: '42 Nehru Nagar',
  city: 'Jaipur',
  phone: '9876543210'
});

console.log('\nInventory Status After Checkout:');
console.table(database.products);

if (myOrder) {
  cancelOrder(myOrder.orderId);
  console.log('\nInventory Status After Cancellation:');
  console.table(database.products);
}

console.log('\n----------------------------------------------------');
console.log('Simulation complete.');
console.log('----------------------------------------------------');
