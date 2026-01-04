const API_URL = "http://localhost:8080/api/cart";

export const getCart = async (token) => {
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch cart");
    return response.json();
};

export const addToCart = async (productId, quantity, token) => {
    const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) throw new Error("Failed to add to cart");
    return response; 
};

export const updateCartItem = async (cartItemId, quantity, token) => {
    const response = await fetch(`${API_URL}/${cartItemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
    });
    if (!response.ok) throw new Error("Failed to update cart");
    return response;
};

export const removeFromCart = async (cartItemId, token) => {
    const response = await fetch(`${API_URL}/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to remove from cart");
    return response;
};
