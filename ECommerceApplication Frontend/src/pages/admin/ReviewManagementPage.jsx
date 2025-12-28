import React from 'react';
import './ReviewManagementPage.css';
import { reviewsData } from './reviewsData';

const ReviewManagementPage = () => {
    // Use imported reviews data
    const reviews = reviewsData;

    return (
        <div className="review-management-page">
            <h2 className="page-header">Review Management</h2>
            <div className="card">
                <h3>Customer Reviews</h3>
                {reviews.length > 0 ? (
                    <table className="reviews-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>User</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr key={review.id}>
                                    <td>{review.product}</td>
                                    <td>{review.user}</td>
                                    <td>{'⭐'.repeat(review.rating)}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.date}</td>
                                    <td>
                                        <button className="btn btn-sm btn-approve">Approve</button>
                                        <button className="btn btn-sm btn-reject">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No reviews to display.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewManagementPage;
