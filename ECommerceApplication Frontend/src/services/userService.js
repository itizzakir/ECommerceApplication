const API_URL = "http://localhost:8080/api/admin/users";

export const getAllUsers = async (token) => {
  const response = await fetch(API_URL, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const updateUser = async (id, user, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response; // returning response instead of json as controller returns string message in body or just 200 OK
};
