import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CustomerDashboard.css';
import { customers } from '../../data/customers.js';
import { products } from '../../data/products.js';
import { fetchOrderHistory } from '../../services/orderService';


// --- SELF-CONTAINED SVG ICONS ---
const Icon = ({ path, size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {path}
    </svg>
);

const ICONS = {
    Package: <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />,
    Heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
    Star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
    Wallet: <path d="M21 12V7H5a2 2 0 01-2-2V3h14a2 2 0 012 2v2M3 5v14a2 2 0 002 2h16a2 2 0 002-2v-4" />,
    Truck: <><path d="M14 17.5V6.5a1 1 0 00-1-1H3.5a1 1 0 00-1 1v11" /><path d="M13 17.5h5.5a1 1 0 001-1V12a1 1 0 00-1-1h-6" /><circle cx="5.5" cy="17.5" r="2.5" /><circle cx="15.5" cy="17.5" r="2.5" /></>,
    LogOut: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
};

// --- CHILD COMPONENTS ---
const StatCard = ({ icon, label, value, iconBg }) => (
    <div className="stat-card">
        <div className="stat-card__icon-wrapper" style={{ backgroundColor: iconBg }}>
            {icon}
        </div>
        <div className="stat-card__info">
            <p>{label}</p>
            <h3>{value}</h3>
        </div>
    </div>
);

const OrderCard = ({ order }) => (
    <div className="order-card">
        <div className="order-card__header">
            <span>#{order.id}</span>
            <span className={`order-card__status ${order.status === 'Delivered' ? 'status--delivered' : order.status === 'Shipped' ? 'status--shipped' : 'status--processing'}`}>
                {order.status}
            </span>
        </div>
        <p className="order-card__total">₹{order.total.toFixed(2)}</p>
        <p className="order-card__date">{order.date}</p>
    </div>
);

const ProductCard = ({ product, onAddToWishlist }) => (
    <div className="product-card">
        <div className="product-card__image-wrapper">
            <img src={product.img} alt={product.title} />
        </div>
        <div className="product-card__info">
            <h3>{product.title}</h3>
            <p>₹{product.price.toFixed(2)}</p>
            <button className="product-card__wishlist-btn" onClick={() => onAddToWishlist(product)}>
                Add to Wishlist
            </button>
        </div>
    </div>
);

const WishlistCard = ({ item, onRemove }) => (
    <div className="wishlist-card">
         <div className="product-card__image-wrapper">
            <img src={item.image} alt={item.name} />
        </div>
        <div className="wishlist-card__info">
            <p className="wishlist-card__name">{item.name}</p>
            <p className="wishlist-card__price">₹{item.price.toFixed(2)}</p>
        </div>
        <button className="wishlist-card__remove" onClick={() => onRemove(item.id)}>&times;</button>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
const CustomerDashboard = () => {
    const [customer, setCustomer] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [ordersError, setOrdersError] = useState(null);

    useEffect(() => {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer));
        } else {
            const defaultCustomer = customers[0];
            localStorage.setItem('customer', JSON.stringify(defaultCustomer));
            setCustomer(defaultCustomer);
        }
    }, []);

    useEffect(() => {
        const getRecentOrders = async () => {
            try {
                const allOrders = await fetchOrderHistory();
                // Sort by date and take the last 2 orders
                const sortedOrders = allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
                setRecentOrders(sortedOrders.slice(0, 2));
            } catch (err) {
                setOrdersError('Failed to fetch recent orders.');
                console.error(err);
            } finally {
                setLoadingOrders(false);
            }
        };
        getRecentOrders();
    }, []);


    const updateCustomer = (updatedCustomer) => {
        setCustomer(updatedCustomer);
        localStorage.setItem('customer', JSON.stringify(updatedCustomer));
    };

    const handleAddToWishlist = (product) => {
        if (customer && !customer.wishlist.find(item => item.id === product.id)) {
            const newWishlist = [...customer.wishlist, { id: product.id, name: product.title, price: product.price, image: product.img }];
            updateCustomer({ ...customer, wishlist: newWishlist });
        }
    };

    const handleRemoveFromWishlist = (productId) => {
        if (customer) {
            const newWishlist = customer.wishlist.filter(item => item.id !== productId);
            updateCustomer({ ...customer, wishlist: newWishlist });
        }
    };
    
    if (!customer) {
        return <div>Loading...</div>;
    }

    const pendingOrdersCount = recentOrders.filter(order => order.status !== 'Delivered').length;

    return (
        <div className="dashboard">
            <main className="dashboard__main">
                <h2 className="dashboard__title">My Dashboard</h2>

                <section className="dashboard__stats-grid">
                    <Link to="/order-history" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StatCard icon={<Icon path={ICONS.Package} />} label="Pending Orders" value={pendingOrdersCount} iconBg="#FFF4E5" />
                    </Link>
                    <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StatCard icon={<Icon path={ICONS.Heart} className="icon--heart-filled" />} label="Wishlist Items" value={customer.wishlist.length} iconBg="#FFEBEE" />
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StatCard icon={<Icon path={ICONS.Star} className="icon--star-filled" />} label="Reward Points" value="1,250" iconBg="#FFF8E1" />
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StatCard icon={<Icon path={ICONS.Wallet} />} label="Account Balance" value="₹50.00" iconBg="#E8F5E9" />
                    </Link>
                </section>
                
                <div className="dashboard__content-area">
                    <div className="dashboard__main-column">
                        <section>
                            <h3>Recent Orders</h3>
                            <div className="dashboard__orders-grid">
                                {loadingOrders ? (
                                    <div>Loading recent orders...</div>
                                ) : ordersError ? (
                                    <div className="error-message">{ordersError}</div>
                                ) : recentOrders.length === 0 ? (
                                    <p>No recent orders found.</p>
                                ) : (
                                    recentOrders.map(order => <OrderCard key={order.id} order={order} />)
                                )}
                            </div>
                        </section>
                        <section>
                            <h3>Discover New Items</h3>
                            <div className="dashboard__products-grid">
                                {products.slice(0, 2).map(product => <ProductCard key={product.id} product={product} onAddToWishlist={handleAddToWishlist} />)}
                            </div>
                        </section>
                    </div>

                    <aside className="dashboard__sidebar">
                        <div className="sidebar-widget">
                             <h3>My Wishlist</h3>
                            <div className="sidebar-widget__content--wishlist">
                                {customer.wishlist.length > 0 ? (
                                    customer.wishlist.map(item => <WishlistCard key={item.id} item={item} onRemove={handleRemoveFromWishlist} />)
                                ) : (
                                    <p>Your wishlist is empty.</p>
                                )}
                            </div>
                        </div>
                         <div className="sidebar-widget">
                            <h3>Track Order</h3>
                            <p>Enter your order ID for status updates.</p>
                            <button>Track</button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default CustomerDashboard;