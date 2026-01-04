const API_URL = "http://localhost:8080/api/admin/payments";

export const getAllPayments = async (token) => {
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch payments");
    return response.json();
};
