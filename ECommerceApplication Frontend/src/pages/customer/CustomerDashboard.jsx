import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CustomerDashboard.css';
import { getAllProducts } from '../../services/productService';
import { fetchOrderHistory, trackOrder } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';

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
    User: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>
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
    <Link to={`/order/${order.id}`} className="order-card" style={{textDecoration: 'none', color: 'inherit'}}>
        <div className="order-card__header">
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>#{order.id}</span>
                {order.trackingId && <span style={{fontSize: '11px', color: '#888', fontWeight: 'normal'}}>Track: {order.trackingId.substring(0, 8)}...</span>}
            </div>
            <span className={`order-card__status ${order.status === 'Delivered' ? 'status--delivered' : order.status === 'Shipped' ? 'status--shipped' : 'status--processing'}`}>
                {order.status}
            </span>
        </div>
        <p className="order-card__total">₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</p>
        <p className="order-card__date">{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : ''}</p>
    </Link>
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
         <div className="wishlist-card__image-wrapper" style={{width: '50px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0}}>
            <img src={item.img} alt={item.title} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
        </div>
        <div className="wishlist-card__info">
            <p className="wishlist-card__name" style={{margin: 0, fontWeight: 500}}>{item.title}</p>
            <p className="wishlist-card__price" style={{margin: 0, fontSize: '12px', color: '#666'}}>₹{item.price}</p>
        </div>
        <button className="wishlist-card__remove" onClick={() => onRemove(item.id)}>&times;</button>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
const CustomerDashboard = () => {
    const { user, updateUser, logout } = useAuth();
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
    const { showNotification } = useNotification();

    const [recentOrders, setRecentOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [ordersError, setOrdersError] = useState(null);
    const [products, setProducts] = useState([]);

    // Tracking State
    const [trackingInput, setTrackingInput] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [trackingError, setTrackingError] = useState('');

    // Profile Edit State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({ fullName: '', phoneNumber: '', address: '' });

    useEffect(() => {
        if (user) {
            setProfileForm({
                fullName: user.fullName || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || ''
            });
        }
    }, [user]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch Orders (Mock or Real)
                // If fetchOrderHistory isn't updated for Auth, this might return mock data or fail.
                // Assuming it works or returns defaults.
                const allOrders = await fetchOrderHistory(); 
                const sortedOrders = allOrders ? allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) : [];
                setRecentOrders(sortedOrders.slice(0, 2));
                setLoadingOrders(false);

                // Fetch Products
                const allProducts = await getAllProducts();
                setProducts(allProducts);
            } catch (err) {
                console.error(err);
                if(!recentOrders.length) setOrdersError('Failed to load dashboard data.');
                setLoadingOrders(false);
            }
        };
        loadData();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUser(profileForm);
            showNotification("Profile updated successfully!", "success");
            setIsEditingProfile(false);
        } catch (error) {
            showNotification("Failed to update profile.", "error");
        }
    };

    const handleTrackOrder = async () => {
        if (!trackingInput.trim()) return;
        setTrackingResult(null);
        setTrackingError('');
        try {
            const order = await trackOrder(trackingInput);
            setTrackingResult(order);
        } catch (error) {
            setTrackingError('Order not found with this ID.');
        }
    };

    if (!user) {
        return <div style={{padding: '40px', textAlign: 'center'}}>Please log in to view your dashboard.</div>;
    }

    const pendingOrdersCount = recentOrders.filter(order => order.status !== 'Delivered').length;

    return (
        <div className="dashboard">
            <main className="dashboard__main">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                    <h2 className="dashboard__title" style={{marginBottom: 0}}>My Dashboard</h2>
                    <span style={{color: '#666'}}>Welcome back, <strong>{user.fullName || user.email.split('@')[0]}</strong></span>
                </div>

                <section className="dashboard__stats-grid">
                    <Link to="/order-history" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StatCard icon={<Icon path={ICONS.Package} />} label="Pending Orders" value={pendingOrdersCount} iconBg="#FFF4E5" />
                    </Link>
                    <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StatCard icon={<Icon path={ICONS.Heart} className="icon--heart-filled" />} label="Wishlist Items" value={wishlistItems.length} iconBg="#FFEBEE" />
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
                                {products.slice(0, 3).map(product => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onAddToWishlist={() => addToWishlist(product)} 
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="dashboard__sidebar">
                        {/* PROFILE WIDGET */}
                        <div className="sidebar-widget profile-widget">
                             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                                <h3>My Profile</h3>
                                <button 
                                    onClick={() => setIsEditingProfile(true)}
                                    style={{width: 'auto', padding: '5px 10px', fontSize: '12px', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)'}}
                                >
                                    Edit
                                </button>
                             </div>
                             <div className="profile-info">
                                <p><strong>Name:</strong> {user.fullName || 'Not set'}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phoneNumber || 'Not set'}</p>
                                <p><strong>Address:</strong> {user.address || 'Not set'}</p>
                             </div>
                        </div>

                        <div className="sidebar-widget">
                             <h3>My Wishlist</h3>
                            <div className="sidebar-widget__content--wishlist">
                                {wishlistItems.length > 0 ? (
                                    wishlistItems.slice(-1).map(item => (
                                        <WishlistCard 
                                            key={item.id} 
                                            item={item} 
                                            onRemove={removeFromWishlist} 
                                        />
                                    ))
                                ) : (
                                    <p>Your wishlist is empty.</p>
                                )}
                                {wishlistItems.length > 1 && (
                                    <Link to="/wishlist" style={{fontSize: '13px', color: 'var(--primary)', textAlign: 'center', display: 'block', marginTop: '10px', textDecoration: 'underline'}}>Show More</Link>
                                )}
                            </div>
                        </div>
                         <div className="sidebar-widget">
                            <h3>Track Order</h3>
                            <p>Enter your Tracking ID for status updates.</p>
                            <div style={{display: 'flex', gap: '5px'}}>
                                <input 
                                    type="text" 
                                    placeholder="Tracking ID" 
                                    value={trackingInput}
                                    onChange={(e) => setTrackingInput(e.target.value)}
                                    style={{flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
                                />
                                <button onClick={handleTrackOrder} style={{width: 'auto'}}>Track</button>
                            </div>
                            {trackingResult && (
                                <div style={{marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '4px', border: '1px solid #eee'}}>
                                    <p style={{margin: '5px 0'}}><strong>Status:</strong> <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>{trackingResult.status}</span></p>
                                    <p style={{margin: '5px 0'}}><strong>Total:</strong> ₹{trackingResult.totalAmount}</p>
                                </div>
                            )}
                            {trackingError && <p style={{color: 'red', marginTop: '10px', fontSize: '13px'}}>{trackingError}</p>}
                        </div>
                    </aside>
                </div>
            </main>

            {/* EDIT PROFILE MODAL */}
            {isEditingProfile && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Profile</h3>
                        <form onSubmit={handleProfileUpdate}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    value={profileForm.fullName}
                                    onChange={e => setProfileForm({...profileForm, fullName: e.target.value})}
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="tel" 
                                    value={profileForm.phoneNumber}
                                    onChange={e => setProfileForm({...profileForm, phoneNumber: e.target.value})}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <textarea 
                                    value={profileForm.address}
                                    onChange={e => setProfileForm({...profileForm, address: e.target.value})}
                                    placeholder="Enter full address"
                                    rows="3"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDashboard;