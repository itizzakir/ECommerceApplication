export const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    orders: [
      { id: 101, date: "2025-12-01", total: 45.99, status: "Delivered" },
      { id: 102, date: "2025-12-15", total: 75.50, status: "Shipped" },
    ],
    wishlist: [
        { id: 1, name: 'Wireless Mouse', price: 25.99, image: '/carousel/Crousel_1.jpg' },
        { id: 2, name: 'Bluetooth Keyboard', price: 49.99, image: '/carousel/image copy 2.png' },
    ]
  }
];
