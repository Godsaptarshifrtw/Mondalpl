import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { analyticsUtils, searchUtils } from '../../utils/firebaseUtils';
import './Analytics.css';

function Analytics() {
  const [totalSales, setTotalSales] = useState(0);
  const [billCount, setBillCount] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        // Get top selling products
        const topSellers = await analyticsUtils.getTopSellingProducts(5);
        setTopProducts(topSellers);

        // Get low stock products
        const lowStock = await searchUtils.getLowStockProducts(20);
        setLowStockProducts(lowStock);

        // Get inventory value
        const inventory = await analyticsUtils.getInventoryValue();
        setInventoryValue(inventory.totalValue);

        // Get total sales
        const total = await analyticsUtils.getTotalSalesAmount();
        setTotalSales(total);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Real-time bills listener for bill count
  useEffect(() => {
    const q = query(collection(db, 'bills'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBillCount(snapshot.size);
      
      // Build daily sales data
      const dailySales = {};
      snapshot.forEach((doc) => {
        const date = doc.data().date;
        if (date) {
          dailySales[date] = (dailySales[date] || 0) + (doc.data().total || 0);
        }
      });

      // Convert to sorted array
      const salesArray = Object.entries(dailySales)
        .map(([date, total]) => ({ date, total }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-7); // Last 7 days

      setSalesData(salesArray);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="analytics-container"><p className="loading">Loading analytics...</p></div>;
  }

  return (
    <div className="analytics-container">
      <h2>📊 Sales Analytics & Overview</h2>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Total Sales</h3>
            <p className="metric-value">₹{totalSales.toFixed(2)}</p>
            <span className="metric-label">All time</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📄</div>
          <div className="metric-content">
            <h3>Total Bills</h3>
            <p className="metric-value">{billCount}</p>
            <span className="metric-label">Generated</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>Inventory Value</h3>
            <p className="metric-value">₹{inventoryValue.toFixed(2)}</p>
            <span className="metric-label">Current stock</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <h3>Low Stock</h3>
            <p className="metric-value">{lowStockProducts.length}</p>
            <span className="metric-label">Items</span>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="chart-section">
        <h3>📈 Sales Trend (Last 7 Days)</h3>
        <div className="sales-chart">
          {salesData.length > 0 ? (
            <div className="bar-chart">
              {salesData.map((data, index) => {
                const maxSale = Math.max(...salesData.map(d => d.total)) || 1;
                const percentage = (data.total / maxSale) * 100;
                return (
                  <div key={index} className="bar-container">
                    <div className="bar" style={{ height: `${percentage}%` }}>
                      <span className="bar-value">₹{(data.total / 1000).toFixed(1)}K</span>
                    </div>
                    <span className="bar-label">{new Date(data.date).toLocaleDateString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-data">No sales data available yet</p>
          )}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="section">
        <h3>🏆 Top Selling Products</h3>
        {topProducts.length > 0 ? (
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                  <th>Times Purchased</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={product.productId}>
                    <td className="rank">{index + 1}</td>
                    <td>{product.productName}</td>
                    <td className="quantity">{product.quantity}</td>
                    <td className="revenue">₹{product.totalRevenue.toFixed(2)}</td>
                    <td className="count">{product.billCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No sales data available yet</p>
        )}
      </div>

      {/* Low Stock Alert */}
      <div className="section">
        <h3>⚠️ Low Stock Items (≤20 units)</h3>
        {lowStockProducts.length > 0 ? (
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product.id} className={`status-${product.quantity === 0 ? 'critical' : 'warning'}`}>
                    <td className="product-name">{product.name}</td>
                    <td>{product.category}</td>
                    <td className="stock-quantity">
                      <span className={`badge ${product.quantity === 0 ? 'badge-danger' : 'badge-warning'}`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="price">₹{product.price?.toFixed(2)}</td>
                    <td className="status-cell">
                      {product.quantity === 0 ? (
                        <span className="status-badge danger">OUT OF STOCK</span>
                      ) : (
                        <span className="status-badge warning">LOW STOCK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">All products have sufficient stock! ✅</p>
        )}
      </div>

      {/* Summary Stats */}
      <div className="summary-section">
        <h3>📊 Quick Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Avg. Sale Per Bill:</span>
            <span className="summary-value">₹{billCount > 0 ? (totalSales / billCount).toFixed(2) : '0.00'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Products:</span>
            <span className="summary-value">{topProducts.reduce((acc, p) => acc + 1, 0)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Critical Alerts:</span>
            <span className="summary-value" style={{ color: lowStockProducts.filter(p => p.quantity === 0).length > 0 ? '#dc3545' : '#28a745' }}>
              {lowStockProducts.filter(p => p.quantity === 0).length}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Warning Count:</span>
            <span className="summary-value" style={{ color: lowStockProducts.filter(p => p.quantity > 0).length > 0 ? '#ffc107' : '#28a745' }}>
              {lowStockProducts.filter(p => p.quantity > 0).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
