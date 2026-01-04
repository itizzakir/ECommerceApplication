import React, { useState, useEffect } from 'react';
import './DashboardOverview.css';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers } from '../../services/userService';
import { getAllProducts } from '../../services/productService';
import {
    summaryCardsData,
    analyticsData,
    bestSellingProductsData,
    recentOrdersData,
    activityLogData
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
    return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
};


const DashboardOverview = () => {
    const [summaryCards, setSummaryCards] = useState(summaryCardsData);
    const [productStats, setProductStats] = useState({ totalProducts: 0, activeProducts: 0, outOfStock: 0 });
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (user?.token) {
                try {
                    const [users, products] = await Promise.all([
                        getAllUsers(user.token),
                        getAllProducts()
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

                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                }
            }
        };
        fetchData();
    }, [user]);

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
                        {recentOrdersData.map((order, index) => (
                            <tr key={index}>
                                <td>{order.orderId}</td>
                                <td>{order.customerName}</td>
                                <td>{order.amount}</td>
                                <td><StatusBadge status={order.status} /></td>
                            </tr>
                        ))}
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
                        <button className="btn btn-primary">Add Product</button>
                        <button className="btn btn-secondary">Manage Categories</button>
                    </div>
                </section>

                {/* ====== Activity Log ====== */}
                <section className="card activity-log">
                    <h3 className="card-header">Activity Log</h3>
                    <ul className="activity-list">
                        {activityLogData.map((activity, index) => (
                            <li key={index} className="activity-item">
                                <p className="activity-action">{activity.action}</p>
                                <p className="activity-timestamp">{activity.timestamp}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

        </div>
    );
};

export default DashboardOverview;
