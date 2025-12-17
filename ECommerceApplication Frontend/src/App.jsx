function App() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow">
        <h1 className="text-9xl text-red-500 font-bold text-gray-800">Velora</h1>
        <ul className="hidden md:flex space-x-6 text-gray-600">
          <li className="hover:text-black cursor-pointer">Home</li>
          <li className="hover:text-black cursor-pointer">Shop</li>
          <li className="hover:text-black cursor-pointer">About</li>
          <li className="hover:text-black cursor-pointer">Contact</li>
        </ul>
        <button className="bg-black text-white px-4 py-2 rounded">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Discover Your Style
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Trendy and comfortable clothing for every season. Upgrade your
          wardrobe with our latest collections.
        </p>
        <div className="mt-6">
          <button className="bg-black text-white px-6 py-3 rounded mr-4">
            Shop Now
          </button>
          <button className="border border-black px-6 py-3 rounded">
            Explore
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-8">
        <h3 className="text-3xl font-bold text-center mb-10">
          Featured Collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="h-56 bg-gray-200 rounded mb-4"></div>
              <h4 className="text-lg font-semibold">Stylish Outfit</h4>
              <p className="text-gray-600 mt-1">$49.99</p>
              <button className="mt-4 w-full bg-black text-white py-2 rounded">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        <p>© 2025 Clothify. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
