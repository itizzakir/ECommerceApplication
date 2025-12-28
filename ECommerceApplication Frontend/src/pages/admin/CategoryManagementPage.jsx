import React, { useState } from 'react';
import './CategoryManagementPage.css';

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Men' },
    { id: 2, name: 'Women' },
    { id: 3, name: 'Kids' },
    { id: 4, name: 'Accessories' },
  ]);

  return (
    <div className="category-management-page">
        <div className="page-header-container">
            <h2 className="page-header">Category Management</h2>
            <button className="add-category-btn">Add Category</button>
        </div>
      
      <div className="table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                    <div className="action-btn-group">
                        <button className="action-btn edit">Edit</button>
                        <button className="action-btn delete">Delete</button>
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
