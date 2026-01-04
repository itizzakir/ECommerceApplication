import React, { useState, useEffect } from 'react';
import './PaymentManagementPage.css';
import { useAuth } from '../../context/AuthContext';
import { getAllPayments } from '../../services/paymentService';

const PaymentManagementPage = () => {
    const [payments, setPayments] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            if (user?.token) {
                try {
                    const data = await getAllPayments(user.token);
                    setPayments(data);
                } catch (error) {
                    console.error("Failed to fetch payments", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPayments();
    }, [user]);

    if (loading) return <div>Loading payments...</div>;

    return (
        <div className="payment-management-page">
            <h2 className="page-header">Payment Management</h2>
            <div className="card">
                <h3>Transaction History</h3>
                {payments.length > 0 ? (
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
                            {payments.map(payment => (
                                <tr key={payment.id}>
                                    <td>{payment.transactionId}</td>
                                    <td>#{payment.order?.id}</td>
                                    <td>{payment.user?.email}</td>
                                    <td>₹{payment.amount.toFixed(2)}</td>
                                    <td>{payment.paymentMethod}</td>
                                    <td><span className={`status-badge status-${payment.status.toLowerCase()}`}>{payment.status}</span></td>
                                    <td>{new Date(payment.transactionDate).toLocaleDateString()}</td>
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
