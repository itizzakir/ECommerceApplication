import React, { useState } from 'react';
import './OrderManagementPage.css';

const StatusBadge = ({ text, type }) => {
    // Combine base class with a type-specific class
    const className = `status-badge status-${text.toLowerCase()}`;
    return <span className={className}>{text}</span>;
};


const OrderManagementPage = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'John Doe', amount: '$150.00', paymentStatus: 'Paid', orderStatus: 'Shipped' },
    { id: 'ORD002', customer: 'Jane Smith', amount: '$200.50', paymentStatus: 'Paid', orderStatus: 'Processing' },
    { id: 'ORD003', customer: 'Sam Wilson', amount: '$75.25', paymentStatus: 'Pending', orderStatus: 'Pending' },
    { id: 'ORD004', customer: 'Alice Brown', amount: '$300.00', paymentStatus: 'Paid', orderStatus: 'Delivered' },
  ]);

  return (
    <div className="order-management-page">
      <h2 className="page-header">Order Management</h2>
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td>
                  <StatusBadge text={order.paymentStatus} type="payment" />
                </td>
                <td>
                  <StatusBadge text={order.orderStatus} type="order" />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;
