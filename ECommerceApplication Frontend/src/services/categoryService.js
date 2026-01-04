const API_URL = "http://localhost:8080/api";

export const getAllCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const createCategory = async (category, token) => {
    const response = await fetch(`${API_URL}/admin/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
    });
    if (!response.ok) throw new Error("Failed to create category");
    return response.json();
};

export const updateCategory = async (id, category, token) => {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
    });
    if (!response.ok) throw new Error("Failed to update category");
    return response.json();
};

export const deleteCategory = async (id, token) => {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to delete category");
    return response;
};
