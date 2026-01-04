import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import './ProductManagementPage.css';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discount: 0,
    stock: 0,
    category: '',
    brand: '',
    img: '',
    rating: 0,
    ratingCount: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      showNotification('Failed to fetch products', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        try {
            await deleteProduct(id, user.token);
            setProducts(products.filter(p => p.id !== id));
            showNotification(`Product deleted successfully.`, 'success');
        } catch (error) {
            showNotification('Failed to delete product', 'error');
        }
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setFormData({
        title: '',
        description: '',
        price: '',
        discount: 0,
        stock: 0,
        category: '',
        brand: '',
        img: '',
        rating: 0,
        ratingCount: 0
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (isEditing) {
            const updated = await updateProduct(currentProduct.id, formData, user.token);
            setProducts(products.map(p => p.id === updated.id ? updated : p));
            showNotification('Product updated successfully', 'success');
        } else {
            const created = await createProduct(formData, user.token);
            setProducts([...products, created]);
            showNotification('Product created successfully', 'success');
        }
        setShowForm(false);
    } catch (error) {
        console.error(error);
        showNotification('Failed to save product. Ensure you are an Admin.', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="product-management-page">
      <h2 className="page-header">Product Management</h2>
      <p className="page-subheader">You are managing {products.length} products.</p>
      
      <div className="action-bar">
        <button onClick={handleAddNew} className="add-product-btn">Add New Product</button>
      </div>

      {showForm && (
        <div className="product-form-container">
            <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="product-form">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <div style={{display: 'flex', gap: '10px'}}>
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required style={{flex: 1}}/>
                    <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required style={{flex: 1}}/>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required style={{flex: 1}}/>
                    <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} style={{flex: 1}}/>
                </div>
                <input type="text" name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} />
                <div className="form-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
      )}

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
                    <button onClick={() => handleEdit(product)} className="action-btn edit">Edit</button>
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