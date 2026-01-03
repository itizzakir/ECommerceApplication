// services/orderService.js

const mockOrders = [
  { 
    id: 1, 
    date: '2025-12-10', 
    status: 'Delivered', 
    total: 1299.00,
    items: [
        { id: 1, name: 'Classic Leather Jacket', quantity: 1, price: 1299.00 }
    ]
  },
  { 
    id: 2, 
    date: '2025-12-15', 
    status: 'Shipped', 
    total: 3498.00,
    items: [
        { id: 2, name: 'Slim Fit Denim Jeans', quantity: 2, price: 1749.00 }
    ]
  },
  { 
    id: 3, 
    date: '2025-12-18', 
    status: 'Pending', 
    total: 799.00,
    items: [
        { id: 3, name: 'V-Neck Cotton T-Shirt', quantity: 1, price: 799.00 }
    ]
  },
];

export const fetchOrderHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500); // Simulate network delay
  });
};
