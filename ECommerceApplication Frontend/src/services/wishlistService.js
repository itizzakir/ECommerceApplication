const API_URL = "http://localhost:8080/api/wishlist";

export const getWishlist = async (token) => {
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch wishlist");
    return response.json();
};

export const addToWishlist = async (productId, token) => {
    const response = await fetch(`${API_URL}/add/${productId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to add to wishlist");
    }
    return response;
};

export const removeFromWishlist = async (wishlistItemId, token) => {
    const response = await fetch(`${API_URL}/${wishlistItemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to remove from wishlist");
    return response;
};
