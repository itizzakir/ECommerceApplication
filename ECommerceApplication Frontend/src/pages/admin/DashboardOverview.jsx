import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardOverview.css';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers } from '../../services/userService';
import { getAllProducts } from '../../services/productService';
import { getAllOrders } from '../../services/orderService';
import { getActivityLogs } from '../../services/activityLogService';
import {
    summaryCardsData,
    analyticsData,
    bestSellingProductsData
} from './data';

// A simple icon map
const Icon = ({ name }) => {
    const icons = {
        users: '👥',
        orders: '🛒',
        revenue: '💲',
        bestseller: '⭐',
        product: '📦',
        category: '🏷️'
    };
    return <span className="icon">{icons[name] || '❓'}</span>;
};

const StatusBadge = ({ status }) => {
    return <span className={`status-badge status-${status ? status.toLowerCase() : 'pending'}`}>{status}</span>;
};


const DashboardOverview = () => {
    const navigate = useNavigate();
    const [summaryCards, setSummaryCards] = useState(summaryCardsData);
    const [productStats, setProductStats] = useState({ totalProducts: 0, activeProducts: 0, outOfStock: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (user?.token) {
                try {
                    const [users, products, orders, fetchedLogs] = await Promise.all([
                        getAllUsers(user.token),
                        getAllProducts(),
                        getAllOrders(user.token),
                        getActivityLogs(user.token)
                    ]);

                    // Update User Count
                    setSummaryCards(prev => {
                        const newCards = [...prev];
                        const userCardIndex = newCards.findIndex(c => c.title === 'Total Users');
                        if (userCardIndex !== -1) {
                            newCards[userCardIndex] = { 
                                ...newCards[userCardIndex], 
                                value: users.length.toString() 
                            };
                        }
                        
                        // Update Orders Count
                        const orderCardIndex = newCards.findIndex(c => c.title === 'Total Orders');
                        if (orderCardIndex !== -1) {
                            newCards[orderCardIndex] = {
                                ...newCards[orderCardIndex],
                                value: orders.length.toString()
                            };
                        }

                        // Update Revenue (Simple sum of all orders)
                        const revenueCardIndex = newCards.findIndex(c => c.title === 'Total Revenue');
                        if (revenueCardIndex !== -1) {
                             const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
                             newCards[revenueCardIndex] = {
                                 ...newCards[revenueCardIndex],
                                 value: `₹${totalRevenue.toFixed(2)}`
                             };
                        }

                        return newCards;
                    });

                    // Update Product Stats
                    const total = products.length;
                    const active = products.filter(p => p.stock > 0).length;
                    const outOfStock = products.filter(p => p.stock === 0).length;
                    
                    setProductStats({
                        totalProducts: total,
                        activeProducts: active,
                        outOfStock: outOfStock
                    });

                    // Update Recent Orders (Top 5)
                    setRecentOrders(orders.slice(0, 5));

                    // Update Activity Logs
                    setLogs(fetchedLogs);

                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                }
            }
        };
        fetchData();
    }, [user]);

    // Pagination Logic
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
    const totalPages = Math.ceil(logs.length / logsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-overview">

            {/* ====== Summary Cards ====== */}
            <section className="dashboard-grid summary-cards">
                {summaryCards.map((card, index) => (
                    <div key={index} className="card summary-card">
                        <div className="card-icon-wrapper">
                            <Icon name={card.icon} />
                        </div>
                        <div className="summary-card-info">
                            <p className="summary-card-value">{card.value}</p>
                            <h3 className="summary-card-title">{card.title}</h3>
                        </div>
                    </div>
                ))}
            </section>

            <div className="dashboard-grid-cols-2">

                {/* ====== Analytics Section ====== */}
                <section className="card analytics-section">
                    <h3 className="card-header">Sales Overview (Last 7 Days)</h3>
                    <div className="analytics-chart">
                        {analyticsData.revenue.map((value, index) => (
                            <div key={index} className="chart-bar-container">
                                <div
                                    className="chart-bar"
                                    style={{ height: `${(value / 3500) * 100}%` }}
                                    title={`$${value}`}
                                ></div>
                                <span className="chart-label">{analyticsData.labels[index]}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ====== Best Selling Products ====== */}
                <section className="card best-selling-products">
                    <h3 className="card-header">Best Selling Products</h3>
                    <ul className="best-selling-list">
                        {bestSellingProductsData.map((product, index) => (
                            <li key={index} className="best-selling-item">
                                <div className="product-info">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">{product.price}</p>
                                </div>
                                <p className="product-sold">{product.sold} sold</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* ====== Recent Orders Table ====== */}
            <section className="card recent-orders">
                <h3 className="card-header">Recent Orders</h3>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.length > 0 ? (
                            recentOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>#{order.id}</td>
                                    <td>{order.user?.email || 'Unknown'}</td>
                                    <td>₹{order.totalAmount?.toFixed(2)}</td>
                                    <td><StatusBadge status={order.status} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>No recent orders.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            <div className="dashboard-grid-cols-2">
                {/* ====== Product Management Quick Actions ====== */}
                <section className="card product-management">
                    <h3 className="card-header">Product Management</h3>
                    <div className="product-stats">
                        <p><span>Total Products:</span> <strong>{productStats.totalProducts}</strong></p>
                        <p><span>Active:</span> <strong>{productStats.activeProducts}</strong></p>
                        <p><span>Out of Stock:</span> <strong>{productStats.outOfStock}</strong></p>
                    </div>
                    <div className="product-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/admin/products')}>Add Product</button>
                        <button className="btn btn-secondary" onClick={() => navigate('/admin/categories')}>Manage Categories</button>
                    </div>
                </section>

                {/* ====== Activity Log ====== */}
                <section className="card activity-log">
                    <h3 className="card-header">Activity Log</h3>
                    <ul className="activity-list">
                        {currentLogs.length > 0 ? (
                            currentLogs.map((activity, index) => (
                                <li key={index} className="activity-item">
                                    <p className="activity-action">
                                        {activity.action}: <span style={{fontWeight: 500}}>[{activity.details}]</span>
                                    </p>
                                    <p className="activity-timestamp">{new Date(activity.timestamp).toLocaleString()}</p>
                                </li>
                            ))
                        ) : (
                            <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>No recent activity.</p>
                        )}
                    </ul>
                    {/* Pagination Controls */}
                    {logs.length > logsPerPage && (
                        <div className="pagination-controls">
                            <button 
                                className="btn-pagination" 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1}
                            >
                                &laquo; Prev
                            </button>
                            <span className="pagination-info">Page {currentPage} of {totalPages}</span>
                            <button 
                                className="btn-pagination" 
                                onClick={() => paginate(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                            >
                                Next &raquo;
                            </button>
                        </div>
                    )}
                </section>
            </div>

        </div>
    );
};

export default DashboardOverview;