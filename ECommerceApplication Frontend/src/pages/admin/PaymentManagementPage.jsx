import React from 'react';
import './PaymentManagementPage.css';
import { paymentsData } from './paymentsData';

const PaymentManagementPage = () => {
    return (
        <div className="payment-management-page">
            <h2 className="page-header">Payment Management</h2>
            <div className="card">
                <h3>Transaction History</h3>
                {paymentsData.length > 0 ? (
                    <table className="payments-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentsData.map(payment => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.orderId}</td>
                                    <td>{payment.customer}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.method}</td>
                                    <td><span className={`status-badge status-${payment.status.toLowerCase()}`}>{payment.status}</span></td>
                                    <td>{payment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No payment transactions to display.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentManagementPage;
