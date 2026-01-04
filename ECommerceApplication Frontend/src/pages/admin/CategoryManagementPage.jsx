import React, { useState, useEffect } from 'react';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './CategoryManagementPage.css';

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', img: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      showNotification('Failed to fetch categories', 'error');
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentCategory(null);
    setFormData({ name: '', img: '' });
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setFormData({ name: category.name, img: category.img || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id, user.token);
        setCategories(categories.filter(c => c.id !== id));
        showNotification('Category deleted successfully', 'success');
      } catch (error) {
        showNotification('Failed to delete category', 'error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updated = await updateCategory(currentCategory.id, formData, user.token);
        setCategories(categories.map(c => c.id === updated.id ? updated : c));
        showNotification('Category updated successfully', 'success');
      } else {
        const created = await createCategory(formData, user.token);
        setCategories([...categories, created]);
        showNotification('Category created successfully', 'success');
      }
      setShowForm(false);
    } catch (error) {
      showNotification('Failed to save category', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="category-management-page">
        <div className="page-header-container">
            <h2 className="page-header">Category Management</h2>
            <button onClick={handleAddNew} className="add-category-btn">Add Category</button>
        </div>

        {showForm && (
            <div className="category-form-container" style={{marginBottom: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px'}}>
                <h3>{isEditing ? 'Edit Category' : 'Add New Category'}</h3>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <input type="text" name="name" placeholder="Category Name" value={formData.name} onChange={handleChange} required style={{padding: '8px'}}/>
                    <input type="text" name="img" placeholder="Image URL (Optional)" value={formData.img} onChange={handleChange} style={{padding: '8px'}}/>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <button type="submit" className="save-btn" style={{padding: '8px 16px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Save</button>
                        <button type="button" onClick={() => setShowForm(false)} className="cancel-btn" style={{padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Cancel</button>
                    </div>
                </form>
            </div>
        )}
      
      <div className="table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.img ? <img src={category.img} alt={category.name} style={{width: '30px', height: '30px', objectFit: 'cover'}}/> : '-'}</td>
                <td>
                    <div className="action-btn-group">
                        <button onClick={() => handleEdit(category)} className="action-btn edit">Edit</button>
                        <button onClick={() => handleDelete(category.id)} className="action-btn delete">Delete</button>
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

export default CategoryManagementPage;
