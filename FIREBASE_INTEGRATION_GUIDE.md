# Firebase Integration Guide - Stock Management System

## Overview

This document provides a complete guide to using Firebase in the Stock Management application. All data is now properly stored, fetched, and modified from Firebase Firestore and Authentication services.

---

## Database Collections

### 1. **Products Collection**
Stores all product information.

**Document Structure:**
```javascript
{
  id: "auto-generated",
  name: "Product Name",
  category: "Category",
  description: "Product Description",
  price: 100.50,
  quantity: 50,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Operations:**
```javascript
import { productService } from './services/firebaseService';

// Add a product
await productService.addProduct({
  name: 'Laptop',
  category: 'Electronics',
  description: 'High-performance laptop',
  price: 50000,
  quantity: 10
});

// Get all products
const products = await productService.getAllProducts();

// Get product by ID
const product = await productService.getProductById('productId');

// Get products by category
const electronics = await productService.getProductsByCategory('Electronics');

// Update product
await productService.updateProduct('productId', {
  price: 55000,
  quantity: 15
});

// Delete product
await productService.deleteProduct('productId');

// Update quantity (increment/decrement)
await productService.updateProductQuantity('productId', -5); // Decrease by 5
await productService.updateProductQuantity('productId', 5);  // Increase by 5

// Real-time listener
const unsubscribe = productService.onProductsChange((products) => {
  console.log('Products updated:', products);
});
// Call unsubscribe() when component unmounts
```

---

### 2. **Bills Collection**
Stores all bill/invoice information.

**Document Structure:**
```javascript
{
  id: "auto-generated",
  fullName: "Customer Name",
  date: "2024-12-09",
  address: "Customer Address",
  phone: "1234567890",
  gst: 18,
  items: [
    {
      productId: "productId",
      productName: "Product Name",
      price: 100,
      quantity: 2,
      subtotal: 200
    }
  ],
  subtotal: 1000,
  gstAmount: 180,
  total: 1180,
  createdAt: Timestamp
}
```

**Operations:**
```javascript
import { billService } from './services/firebaseService';

// Add a bill
await billService.addBill({
  fullName: 'John Doe',
  date: '2024-12-09',
  address: '123 Main Street',
  phone: '9876543210',
  gst: 18,
  items: [...],
  subtotal: 1000,
  gstAmount: 180,
  total: 1180
});

// Get all bills
const bills = await billService.getAllBills();

// Get bill by ID
const bill = await billService.getBillById('billId');

// Get bills by customer name
const customerBills = await billService.getBillsByCustomer('John Doe');

// Get bills within date range
const bills = await billService.getBillsByDateRange('2024-12-01', '2024-12-31');

// Update bill (for corrections)
await billService.updateBill('billId', {
  address: 'New Address',
  phone: '1234567890'
});

// Delete bill
await billService.deleteBill('billId');

// Real-time listener
const unsubscribe = billService.onBillsChange((bills) => {
  console.log('Bills updated:', bills);
});
```

---

### 3. **Customers Collection** (Optional)
Stores customer information for recurring customers.

**Document Structure:**
```javascript
{
  id: "auto-generated",
  name: "Customer Name",
  phone: "1234567890",
  email: "customer@email.com",
  address: "Customer Address",
  notes: "Additional notes",
  createdAt: Timestamp
}
```

**Operations:**
```javascript
import { customerService } from './services/firebaseService';

// Add customer
await customerService.addCustomer({
  name: 'John Doe',
  phone: '9876543210',
  email: 'john@example.com',
  address: '123 Main Street'
});

// Get all customers
const customers = await customerService.getAllCustomers();

// Search customer
const searchResults = await customerService.searchCustomer('John');

// Update customer
await customerService.updateCustomer('customerId', {
  phone: '1234567890'
});

// Delete customer
await customerService.deleteCustomer('customerId');
```

---

### 4. **Users Collection**
Stores user profile information.

**Document Structure:**
```javascript
{
  id: "firebase-auth-uid",
  email: "user@example.com",
  displayName: "User Name",
  role: "admin", // or "staff"
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Operations:**
```javascript
import { userProfileService } from './services/firebaseService';

// Create user profile
await userProfileService.createUserProfile(userId, {
  email: 'user@example.com',
  displayName: 'John Doe',
  role: 'admin'
});

// Get user profile
const profile = await userProfileService.getUserProfile(userId);

// Update user profile
await userProfileService.updateUserProfile(userId, {
  displayName: 'Jane Doe'
});
```

---

### 5. **Inventory Logs Collection**
Tracks all inventory changes for audit purposes.

**Document Structure:**
```javascript
{
  id: "auto-generated",
  productId: "productId",
  productName: "Product Name",
  action: "add", // or "remove", "adjust"
  previousQuantity: 10,
  newQuantity: 15,
  quantityChange: 5,
  reason: "Stock purchase",
  userId: "userId",
  timestamp: Timestamp
}
```

**Operations:**
```javascript
import { inventoryLogService } from './services/firebaseService';

// Add log
await inventoryLogService.addInventoryLog({
  productId: 'productId',
  productName: 'Product Name',
  action: 'add',
  previousQuantity: 10,
  newQuantity: 15,
  quantityChange: 5,
  reason: 'Stock purchase'
});

// Get logs for product
const logs = await inventoryLogService.getLogsForProduct('productId');

// Get all logs
const allLogs = await inventoryLogService.getAllLogs();
```

---

## Utility Functions

### Search Utilities
```javascript
import { searchUtils } from './utils/firebaseUtils';

// Search by product name
const results = await searchUtils.searchProductsByName('Laptop');

// Search by price range
const products = await searchUtils.searchProductsByPriceRange(1000, 50000);

// Get low stock products
const lowStock = await searchUtils.getLowStockProducts(10); // threshold = 10

// Get out of stock products
const outOfStock = await searchUtils.getOutOfStockProducts();
```

### Analytics Utilities
```javascript
import { analyticsUtils } from './utils/firebaseUtils';

// Get total sales
const totalSales = await analyticsUtils.getTotalSalesAmount();

// Get sales by date
const daySales = await analyticsUtils.getSalesByDate('2024-12-09');
// Returns: { totalSales: 5000, billCount: 10, date: '2024-12-09' }

// Get top selling products
const topProducts = await analyticsUtils.getTopSellingProducts(10);

// Get inventory value
const inventory = await analyticsUtils.getInventoryValue();
// Returns: { totalValue: 100000, products: [...] }
```

### Validation Utilities
```javascript
import { validationUtils } from './utils/firebaseUtils';

// Validate product data
const productValidation = validationUtils.validateProductData({
  name: 'Product',
  price: 100,
  quantity: 10
});

// Validate bill data
const billValidation = validationUtils.validateBillData({
  fullName: 'Customer',
  date: '2024-12-09',
  items: [...]
});

// Validate customer data
const customerValidation = validationUtils.validateCustomerData({
  name: 'Customer',
  phone: '9876543210',
  email: 'customer@email.com'
});
```

### Export Utilities
```javascript
import { exportUtils } from './utils/firebaseUtils';

// Export products to CSV
await exportUtils.exportProductsToCSV(products);

// Export bills to CSV
await exportUtils.exportBillsToCSV(bills);
```

---

## Batch Operations

### Batch Update Products
```javascript
import { batchOperations } from './services/firebaseService';

// Update multiple products
await batchOperations.batchUpdateProducts([
  {
    productId: 'id1',
    data: { quantity: 20 }
  },
  {
    productId: 'id2',
    data: { price: 150 }
  }
]);
```

### Bill Generation with Transaction
```javascript
import { batchOperations } from './services/firebaseService';

// Generate bill with atomic product quantity updates
const billId = await batchOperations.generateBillTransaction(
  {
    fullName: 'Customer Name',
    date: '2024-12-09',
    items: [...],
    total: 1180
  },
  [
    { productId: 'id1', newQuantity: 45 },
    { productId: 'id2', newQuantity: 30 }
  ]
);
```

---

## Real-Time Listeners

Real-time listeners automatically update your data whenever changes occur in Firestore:

```javascript
// Set up listener
const unsubscribe = productService.onProductsChange((products) => {
  // This callback is called whenever products change
  setProducts(products);
});

// In useEffect cleanup
useEffect(() => {
  const unsubscribe = productService.onProductsChange(callback);
  return () => unsubscribe(); // Cleanup listener
}, []);
```

---

## Error Handling

Always wrap Firebase operations in try-catch blocks:

```javascript
try {
  const product = await productService.addProduct(productData);
  console.log('Product added:', product);
} catch (error) {
  console.error('Error adding product:', error);
  // Handle error appropriately
  setError(error.message);
}
```

---

## Firebase Rules (Firestore Security)

Update your Firestore rules for proper access control:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Allow authenticated users to access products
    match /products/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Allow authenticated users to access bills
    match /bills/{document=**} {
      allow read, write: if request.auth != null;
    }

    // Allow authenticated users to access customers
    match /customers/{document=**} {
      allow read, write: if request.auth != null;
    }

    // Allow authenticated users to access inventory logs
    match /inventoryLogs/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Best Practices

1. **Always use transactions** for operations that modify multiple documents
2. **Set up real-time listeners** for data that needs to be kept in sync
3. **Validate data** before writing to Firestore
4. **Use indexes** for queries with multiple conditions
5. **Handle errors gracefully** and provide user feedback
6. **Unsubscribe from listeners** in component cleanup to prevent memory leaks
7. **Use batch operations** for updating multiple documents
8. **Implement proper authentication** and authorization checks

---

## Troubleshooting

### Data not persisting?
- Check Firestore rules allow write operations
- Verify Firebase initialization is correct
- Check browser console for errors

### Real-time listeners not updating?
- Ensure listeners are properly set up
- Check Firestore security rules
- Verify connection status

### Offline persistence not working?
- Check browser supports IndexedDB
- Verify offline persistence is enabled in firebase.js

---

## Next Steps

1. Implement role-based access control
2. Add advanced search and filtering
3. Create analytics dashboard
4. Implement data backup and export features
5. Add detailed audit logs
