const API_URL = "http://localhost:8080/api/orders";

export const createOrder = async (orderData, token) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    });
    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to place order");
    }
    return response;
};

export const fetchOrderHistory = async (token) => {
    // If no token is provided (e.g. from a component that handles auth internally), try to get from localStorage or context if possible. 
    // But better design is to pass token. For now, assuming token is passed or we handle guest check.
    if (!token) {
        // Fallback for dashboard if called without token, try to read user from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            token = JSON.parse(userStr).token;
        } else {
             return []; // No token, no orders
        }
    }

    const response = await fetch(`${API_URL}/my-orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
};

export const getAllOrders = async (token) => {
    const response = await fetch(`${API_URL}/admin`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch all orders");
    return response.json();
};

export const updateOrderStatus = async (orderId, status, token) => {
    const response = await fetch(`${API_URL}/admin/${orderId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error("Failed to update status");
    return response;
};