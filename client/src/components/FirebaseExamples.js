import React, { useState, useEffect } from 'react';
import {
  productService,
  billService,
  customerService,
  inventoryLogService,
  batchOperations
} from '../../services/firebaseService';
import {
  searchUtils,
  analyticsUtils,
  validationUtils,
  exportUtils
} from '../../utils/firebaseUtils';

/**
 * Example component showing how to use Firebase services
 * This demonstrates all CRUD operations and utility functions
 */

function FirebaseExamplesComponent() {
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Example: Load products with real-time listener
  useEffect(() => {
    const unsubscribe = productService.onProductsChange((products) => {
      setProducts(products);
    });

    return () => unsubscribe();
  }, []);

  // Example: Load bills with real-time listener
  useEffect(() => {
    const unsubscribe = billService.onBillsChange((bills) => {
      setBills(bills);
    });

    return () => unsubscribe();
  }, []);

  const handleError = (error) => {
    console.error(error);
    setError(error.message || 'An error occurred');
    setTimeout(() => setError(null), 3000);
  };

  const handleSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  // ===== PRODUCT EXAMPLES =====

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      // Validate data
      const validation = validationUtils.validateProductData({
        name: 'New Laptop',
        price: 50000,
        quantity: 10
      });

      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const product = await productService.addProduct({
        name: 'New Laptop',
        category: 'Electronics',
        description: 'High-performance laptop',
        price: 50000,
        quantity: 10
      });

      handleSuccess('Product added successfully');
      console.log('Added product:', product);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (productId) => {
    setLoading(true);
    try {
      const updatedProduct = await productService.updateProduct(productId, {
        price: 55000,
        quantity: 20
      });

      handleSuccess('Product updated successfully');
      console.log('Updated product:', updatedProduct);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setLoading(true);
    try {
      await productService.deleteProduct(productId);
      handleSuccess('Product deleted successfully');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByName = async () => {
    setLoading(true);
    try {
      const results = await searchUtils.searchProductsByName('Laptop');
      console.log('Search results:', results);
      handleSuccess(`Found ${results.length} products`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLowStock = async () => {
    setLoading(true);
    try {
      const lowStockProducts = await searchUtils.getLowStockProducts(10);
      console.log('Low stock products:', lowStockProducts);
      handleSuccess(`Found ${lowStockProducts.length} low stock products`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== BILL EXAMPLES =====

  const handleAddBill = async () => {
    setLoading(true);
    try {
      // Validate data
      const billData = {
        fullName: 'John Doe',
        date: '2024-12-09',
        address: '123 Main Street',
        phone: '9876543210',
        gst: 18,
        items: [
          {
            productId: 'prod1',
            productName: 'Laptop',
            price: 50000,
            quantity: 1,
            subtotal: 50000
          }
        ],
        subtotal: 50000,
        gstAmount: 9000,
        total: 59000
      };

      const validation = validationUtils.validateBillData(billData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const bill = await billService.addBill(billData);
      handleSuccess('Bill added successfully');
      console.log('Added bill:', bill);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetBillsByCustomer = async () => {
    setLoading(true);
    try {
      const customerBills = await billService.getBillsByCustomer('John Doe');
      console.log('Customer bills:', customerBills);
      handleSuccess(`Found ${customerBills.length} bills`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== ANALYTICS EXAMPLES =====

  const handleGetTotalSales = async () => {
    setLoading(true);
    try {
      const totalSales = await analyticsUtils.getTotalSalesAmount();
      console.log('Total sales:', totalSales);
      handleSuccess(`Total sales: ₹${totalSales.toFixed(2)}`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTopProducts = async () => {
    setLoading(true);
    try {
      const topProducts = await analyticsUtils.getTopSellingProducts(10);
      console.log('Top selling products:', topProducts);
      handleSuccess(`Found ${topProducts.length} top products`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInventoryValue = async () => {
    setLoading(true);
    try {
      const inventory = await analyticsUtils.getInventoryValue();
      console.log('Inventory value:', inventory);
      handleSuccess(`Total inventory value: ₹${inventory.totalValue.toFixed(2)}`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== CUSTOMER EXAMPLES =====

  const handleAddCustomer = async () => {
    setLoading(true);
    try {
      const customerData = {
        name: 'John Doe',
        phone: '9876543210',
        email: 'john@example.com',
        address: '123 Main Street'
      };

      const validation = validationUtils.validateCustomerData(customerData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const customer = await customerService.addCustomer(customerData);
      handleSuccess('Customer added successfully');
      console.log('Added customer:', customer);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCustomer = async () => {
    setLoading(true);
    try {
      const results = await customerService.searchCustomer('John');
      console.log('Search results:', results);
      handleSuccess(`Found ${results.length} customers`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== BATCH OPERATIONS EXAMPLES =====

  const handleBatchUpdateProducts = async () => {
    setLoading(true);
    try {
      await batchOperations.batchUpdateProducts([
        {
          productId: 'productId1',
          data: { quantity: 20, price: 100 }
        },
        {
          productId: 'productId2',
          data: { quantity: 30 }
        }
      ]);

      handleSuccess('Products updated in batch');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== EXPORT EXAMPLES =====

  const handleExportProducts = async () => {
    try {
      await exportUtils.exportProductsToCSV(products);
      handleSuccess('Products exported to CSV');
    } catch (error) {
      handleError(error);
    }
  };

  const handleExportBills = async () => {
    try {
      await exportUtils.exportBillsToCSV(bills);
      handleSuccess('Bills exported to CSV');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Firebase Integration Examples</h1>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <div style={styles.section}>
        <h2>Product Operations</h2>
        <button onClick={handleAddProduct} disabled={loading} style={styles.button}>
          {loading ? 'Loading...' : 'Add Product'}
        </button>
        <button onClick={handleSearchByName} disabled={loading} style={styles.button}>
          Search Products by Name
        </button>
        <button onClick={handleGetLowStock} disabled={loading} style={styles.button}>
          Get Low Stock Products
        </button>
        <button onClick={handleExportProducts} disabled={loading} style={styles.button}>
          Export Products to CSV
        </button>
      </div>

      <div style={styles.section}>
        <h2>Bill Operations</h2>
        <button onClick={handleAddBill} disabled={loading} style={styles.button}>
          Add Bill
        </button>
        <button onClick={handleGetBillsByCustomer} disabled={loading} style={styles.button}>
          Get Customer Bills
        </button>
        <button onClick={handleExportBills} disabled={loading} style={styles.button}>
          Export Bills to CSV
        </button>
      </div>

      <div style={styles.section}>
        <h2>Analytics</h2>
        <button onClick={handleGetTotalSales} disabled={loading} style={styles.button}>
          Get Total Sales
        </button>
        <button onClick={handleGetTopProducts} disabled={loading} style={styles.button}>
          Get Top Selling Products
        </button>
        <button onClick={handleGetInventoryValue} disabled={loading} style={styles.button}>
          Get Inventory Value
        </button>
      </div>

      <div style={styles.section}>
        <h2>Customer Operations</h2>
        <button onClick={handleAddCustomer} disabled={loading} style={styles.button}>
          Add Customer
        </button>
        <button onClick={handleSearchCustomer} disabled={loading} style={styles.button}>
          Search Customer
        </button>
      </div>

      <div style={styles.section}>
        <h2>Batch Operations</h2>
        <button onClick={handleBatchUpdateProducts} disabled={loading} style={styles.button}>
          Batch Update Products
        </button>
      </div>

      <div style={styles.section}>
        <h2>Data Summary</h2>
        <p>Total Products: {products.length}</p>
        <p>Total Bills: {bills.length}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  section: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px'
  },
  button: {
    margin: '5px',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  error: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px'
  },
  success: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px'
  }
};

export default FirebaseExamplesComponent;
