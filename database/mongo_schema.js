/**
 * MongoDB Collections and Indexes Initializer Script
 * Run in mongosh or MongoDB Compass:
 *   load("database/mongo_schema.js")
 */

const dbName = 'ecommerce_db';
const db = db.getSiblingDB(dbName);

// 1. Users Collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'password', 'role'],
      properties: {
        name: { bsonType: 'string', description: 'User full name - required' },
        email: { bsonType: 'string', pattern: '^.+@.+$', description: 'User valid email - required' },
        password: { bsonType: 'string', description: 'Hashed password - required' },
        phone: { bsonType: 'string' },
        role: { enum: ['customer', 'admin'] },
        addresses: { bsonType: 'array' },
        isActive: { bsonType: 'bool' }
      }
    }
  }
});
db.users.createIndex({ email: 1 }, { unique: true });

// 2. Categories Collection
db.createCollection('categories', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'slug'],
      properties: {
        name: { bsonType: 'string' },
        slug: { bsonType: 'string' },
        description: { bsonType: 'string' },
        isActive: { bsonType: 'bool' }
      }
    }
  }
});
db.categories.createIndex({ name: 1 }, { unique: true });
db.categories.createIndex({ slug: 1 }, { unique: true });

// 3. Products Collection
db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'slug', 'description', 'price', 'category', 'stock'],
      properties: {
        name: { bsonType: 'string' },
        slug: { bsonType: 'string' },
        description: { bsonType: 'string' },
        price: { bsonType: 'number', minimum: 0 },
        discountPrice: { bsonType: 'number', minimum: 0 },
        category: { bsonType: 'objectId' },
        brand: { bsonType: 'string' },
        sku: { bsonType: 'string' },
        stock: { bsonType: 'number', minimum: 0 },
        images: { bsonType: 'array' },
        ratingAverage: { bsonType: 'number' },
        ratingsQuantity: { bsonType: 'number' },
        isFeatured: { bsonType: 'bool' },
        isActive: { bsonType: 'bool' }
      }
    }
  }
});
db.products.createIndex({ slug: 1 }, { unique: true });
db.products.createIndex({ sku: 1 }, { unique: true, sparse: true });
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 'text', description: 'text', brand: 'text' });

// 4. Carts Collection
db.createCollection('carts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user', 'items'],
      properties: {
        user: { bsonType: 'objectId' },
        items: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['product', 'quantity', 'price'],
            properties: {
              product: { bsonType: 'objectId' },
              quantity: { bsonType: 'number', minimum: 1 },
              price: { bsonType: 'number', minimum: 0 }
            }
          }
        },
        totalAmount: { bsonType: 'number', minimum: 0 }
      }
    }
  }
});
db.carts.createIndex({ user: 1 }, { unique: true });

// 5. Orders Collection
db.createCollection('orders', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orderNumber', 'user', 'items', 'shippingAddress', 'totalPrice'],
      properties: {
        orderNumber: { bsonType: 'string' },
        user: { bsonType: 'objectId' },
        items: { bsonType: 'array' },
        shippingAddress: { bsonType: 'object' },
        paymentMethod: { enum: ['COD', 'Card', 'UPI', 'NetBanking', 'PayPal', 'Stripe'] },
        paymentStatus: { enum: ['Pending', 'Completed', 'Failed', 'Refunded'] },
        orderStatus: { enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] },
        totalPrice: { bsonType: 'number', minimum: 0 }
      }
    }
  }
});
db.orders.createIndex({ orderNumber: 1 }, { unique: true });
db.orders.createIndex({ user: 1 });
db.orders.createIndex({ orderStatus: 1 });

// 6. Payments Collection
db.createCollection('payments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['order', 'user', 'transactionId', 'amount', 'status'],
      properties: {
        order: { bsonType: 'objectId' },
        user: { bsonType: 'objectId' },
        transactionId: { bsonType: 'string' },
        amount: { bsonType: 'number', minimum: 0 },
        currency: { bsonType: 'string' },
        status: { enum: ['Pending', 'Success', 'Failed', 'Refunded'] }
      }
    }
  }
});
db.payments.createIndex({ transactionId: 1 }, { unique: true });
db.payments.createIndex({ order: 1 });
db.payments.createIndex({ user: 1 });

print("E-Commerce Collections and Indexes successfully created in '" + dbName + "'.");
