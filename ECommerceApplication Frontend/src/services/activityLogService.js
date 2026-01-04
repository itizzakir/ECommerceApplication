const API_URL = "http://localhost:8080/api/admin/activity-logs";

export const getActivityLogs = async (token) => {
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch activity logs");
    return response.json();
};
