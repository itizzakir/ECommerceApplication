import React, { useState } from 'react';
import { products as initialProducts } from '../../data/products';
import { useNotification } from '../../context/NotificationContext';
import './ProductManagementPage.css';

const ProductManagementPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const { showNotification } = useNotification();

  const handleAddNew = () => {
    showNotification('Mock: Opening form to add a new product.', 'info');
  };

  const handleEdit = (id) => {
    showNotification(`Mock: Opening form to edit product with ID: ${id}.`, 'info');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showNotification(`Product with ID: ${id} deleted successfully.`, 'success');
  };

  return (
    <div className="product-management-page">
      <h2 className="page-header">Product Management</h2>
      <p className="page-subheader">You are managing {products.length} products.</p>
      
      <div className="action-bar">
        <button onClick={handleAddNew} className="add-product-btn">Add New Product</button>
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="action-btn-group">
                    <button onClick={() => handleEdit(product.id)} className="action-btn edit">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="action-btn delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementPage;
