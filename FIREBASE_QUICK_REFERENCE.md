# Firebase Quick Reference Guide

## 🎯 Most Common Operations

### Products

#### Add Product
```javascript
import { productService } from './services/firebaseService';

const newProduct = await productService.addProduct({
  name: 'Product Name',
  category: 'Electronics',
  description: 'Product Description',
  price: 100.00,
  quantity: 10
});
```

#### Get All Products (Real-time)
```javascript
import { productService } from './services/firebaseService';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = productService.onProductsChange((products) => {
      setProducts(products);
    });
    return () => unsubscribe();
  }, []);

  return <div>{products.length} products</div>;
}
```

#### Update Product
```javascript
await productService.updateProduct('productId', {
  quantity: 20,
  price: 120.00
});
```

#### Delete Product
```javascript
await productService.deleteProduct('productId');
```

#### Update Quantity
```javascript
// Increase quantity by 5
await productService.updateProductQuantity('productId', 5);

// Decrease quantity by 5
await productService.updateProductQuantity('productId', -5);
```

---

### Bills

#### Create Bill
```javascript
import { billService } from './services/firebaseService';

const bill = await billService.addBill({
  fullName: 'Customer Name',
  date: '2024-12-09',
  address: 'Customer Address',
  phone: '9876543210',
  gst: 18,
  items: [
    {
      productId: 'id1',
      productName: 'Product 1',
      price: 100,
      quantity: 2,
      subtotal: 200
    }
  ],
  subtotal: 200,
  gstAmount: 36,
  total: 236
});
```

#### Get All Bills (Real-time)
```javascript
import { billService } from './services/firebaseService';

const unsubscribe = billService.onBillsChange((bills) => {
  console.log('Bills:', bills);
});
```

#### Get Customer Bills
```javascript
const customerBills = await billService.getBillsByCustomer('John Doe');
```

#### Get Bills by Date Range
```javascript
const bills = await billService.getBillsByDateRange(
  '2024-12-01',
  '2024-12-31'
);
```

---

### Customers

#### Add Customer
```javascript
import { customerService } from './services/firebaseService';

const customer = await customerService.addCustomer({
  name: 'Customer Name',
  phone: '9876543210',
  email: 'customer@email.com',
  address: 'Customer Address'
});
```

#### Get All Customers
```javascript
const customers = await customerService.getAllCustomers();
```

#### Search Customer
```javascript
const results = await customerService.searchCustomer('John');
```

#### Update Customer
```javascript
await customerService.updateCustomer('customerId', {
  phone: '1234567890',
  email: 'newemail@email.com'
});
```

---

### Search & Filter

#### Search Products by Name
```javascript
import { searchUtils } from './utils/firebaseUtils';

const results = await searchUtils.searchProductsByName('Laptop');
```

#### Search by Price Range
```javascript
const products = await searchUtils.searchProductsByPriceRange(1000, 50000);
```

#### Get Low Stock Products
```javascript
const lowStock = await searchUtils.getLowStockProducts(10); // threshold
```

#### Get Out of Stock
```javascript
const outOfStock = await searchUtils.getOutOfStockProducts();
```

---

### Analytics

#### Total Sales
```javascript
import { analyticsUtils } from './utils/firebaseUtils';

const total = await analyticsUtils.getTotalSalesAmount();
console.log('Total Sales: ₹' + total);
```

#### Sales by Date
```javascript
const dayStats = await analyticsUtils.getSalesByDate('2024-12-09');
console.log('Bills today:', dayStats.billCount);
console.log('Sales today:', dayStats.totalSales);
```

#### Top Selling Products
```javascript
const topProducts = await analyticsUtils.getTopSellingProducts(10);
topProducts.forEach(p => {
  console.log(`${p.productName}: ${p.quantity} units`);
});
```

#### Inventory Value
```javascript
const inventory = await analyticsUtils.getInventoryValue();
console.log('Total Inventory Value: ₹' + inventory.totalValue);
```

---

### Validation

#### Validate Product
```javascript
import { validationUtils } from './utils/firebaseUtils';

const validation = validationUtils.validateProductData({
  name: 'Product',
  price: 100,
  quantity: 10
});

if (validation.isValid) {
  // Safe to save
} else {
  console.error(validation.errors);
}
```

#### Validate Bill
```javascript
const validation = validationUtils.validateBillData({
  fullName: 'Customer',
  date: '2024-12-09',
  items: [...],
  total: 1000
});
```

#### Validate Customer
```javascript
const validation = validationUtils.validateCustomerData({
  name: 'Customer',
  phone: '9876543210',
  email: 'email@example.com'
});
```

---

### Export

#### Export Products to CSV
```javascript
import { exportUtils } from './utils/firebaseUtils';

const products = await productService.getAllProducts();
await exportUtils.exportProductsToCSV(products);
```

#### Export Bills to CSV
```javascript
const bills = await billService.getAllBills();
await exportUtils.exportBillsToCSV(bills);
```

---

### Batch Operations

#### Update Multiple Products
```javascript
import { batchOperations } from './services/firebaseService';

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

#### Generate Bill with Transaction
```javascript
const billId = await batchOperations.generateBillTransaction(
  {
    fullName: 'Customer',
    date: '2024-12-09',
    items: [...],
    total: 1000
  },
  [
    { productId: 'id1', newQuantity: 45 },
    { productId: 'id2', newQuantity: 30 }
  ]
);
```

---

## 🛡️ Error Handling Template

```javascript
try {
  const product = await productService.addProduct(productData);
  console.log('Success:', product);
  // Update UI
} catch (error) {
  console.error('Error:', error.message);
  // Show error to user
  setError(error.message);
  // Retry logic if needed
}
```

---

## 🔄 Real-time Listener Template

```javascript
useEffect(() => {
  // Set up listener
  const unsubscribe = productService.onProductsChange((products) => {
    setProducts(products);
  });

  // Cleanup on unmount
  return () => {
    unsubscribe();
  };
}, []);
```

---

## 📊 Complete Example Component

```javascript
import React, { useState, useEffect } from 'react';
import { productService } from './services/firebaseService';
import { searchUtils } from './utils/firebaseUtils';

function StockDashboard() {
  const [products, setProducts] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState([]);

  // Real-time products
  useEffect(() => {
    const unsubscribe = productService.onProductsChange((products) => {
      setProducts(products);
    });
    return () => unsubscribe();
  }, []);

  // Check low stock
  useEffect(() => {
    const checkLowStock = async () => {
      const lowStock = await searchUtils.getLowStockProducts(10);
      setLowStockAlert(lowStock);
    };
    checkLowStock();
  }, []);

  const handleAddProduct = async () => {
    try {
      await productService.addProduct({
        name: 'New Product',
        price: 100,
        quantity: 10
      });
      // UI updates automatically via listener
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Stock Dashboard</h1>
      <p>Total Products: {products.length}</p>
      <p>Low Stock Items: {lowStockAlert.length}</p>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - {p.quantity} in stock</li>
        ))}
      </ul>
    </div>
  );
}

export default StockDashboard;
```

---

## 🚨 Common Issues & Solutions

### Data not updating?
```javascript
// Check if listener is set up
const unsubscribe = productService.onProductsChange(callback);
// Don't forget to unsubscribe!
useEffect(() => {
  const unsubscribe = ...;
  return () => unsubscribe();
}, []);
```

### Getting undefined data?
```javascript
// Check for null/undefined
if (product && product.quantity > 0) {
  // Safe to use
}
```

### Performance issues?
```javascript
// Use batch updates instead of individual updates
await batchOperations.batchUpdateProducts(updates);

// Limit real-time listeners to what you need
// Only listen to collections you're using
```

---

## 📋 Checklist for New Features

- [ ] Import required service/utility
- [ ] Add error handling with try-catch
- [ ] Validate data before saving
- [ ] Set up real-time listener if needed
- [ ] Cleanup listeners in useEffect
- [ ] Update UI after operation
- [ ] Provide user feedback (success/error)
- [ ] Test offline functionality
- [ ] Check Firebase security rules

---

## 🔗 Firebase Collections Quick Reference

| Collection | Add | Read | Update | Delete |
|-----------|-----|------|--------|--------|
| products | ✅ | ✅ | ✅ | ✅ |
| bills | ✅ | ✅ | ✅ | ✅ |
| customers | ✅ | ✅ | ✅ | ✅ |
| users | ✅ | ✅ | ✅ | ❌ |
| inventoryLogs | ✅ | ✅ | ❌ | ❌ |

---

**All data is now stored in Firebase!** Use this guide for quick reference. 🚀
