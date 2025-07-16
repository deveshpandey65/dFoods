'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { offers } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';
import { NavbarDemo } from '@/components/navbar/nav';
import Footer from '@/components/Footer';

export default function Cart() {
    const router = useRouter();
    const { cart, addToCart, removeFromCart, clearCart, placeOrder } = useCart();

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    // NEW: User Detail Modal State
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const validCoupons = {
        SAVE20: 0.2,
        FLAT100: 100,
        FREEDELIVERY: 50,
    };

    const getSubtotal = () => cart.reduce((total, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return total + price * (item.quantity || 1);
    }, 0);

    const getDiscount = () => {
        const subtotal = getSubtotal();
        if (appliedCoupon) {
            const value = validCoupons[appliedCoupon];
            return value < 1 ? Math.floor(subtotal * value) : Math.min(subtotal, value);
        }
        return 0;
    };

    const getTotal = () => Math.max(getSubtotal() - getDiscount(), 0);

    const applyCoupon = () => {
        if (validCoupons[couponCode.toUpperCase()]) {
            setAppliedCoupon(couponCode.toUpperCase());
            setCouponError('');
        } else {
            setAppliedCoupon(null);
            setCouponError('Invalid coupon code.');
        }
    };

    // NEW: Handle Final Submission
    const submitOrder = () => {
        if (!userDetails.name || !userDetails.address || !userDetails.phone) {
            alert('Please fill all details');
            return;
        }

        // You can send this info to backend via fetch/axios if needed
        console.log('Order Details:', {
            cart,
            total: getTotal(),
            userDetails,
        });
        const emailDATA= JSON.parse(localStorage.getItem('userEmail'));
        console.log('Email Data:', emailDATA);
        console.log('emailDATA:', emailDATA.email);
        userDetails.email =emailDATA.email || '';
        if (!userDetails.email) {
            alert('Please login to place an order.');
            return;
        }
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('total' , getTotal());
        
        placeOrder();
        alert('Order placed successfully!');
        clearCart();
        router.push('/orders');
    };

    return (
        <div className='flex flex-col'>
            <div className="fixed top-0 left-0 w-full z-50">
                <NavbarDemo />
            </div>

            <div className="h-20" />
            <div className="bg-gray-100 min-h-screen">
                <div className="w-full max-w-6xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">Your Cart</h1>

                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg">Your cart is empty.</div>
                    ) : (
                        <div className="bg-white rounded-xl shadow p-6 space-y-6">
                            <ul className="divide-y">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex justify-between items-center py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                                <p className="text-gray-600">Price: {item.price}</p>
                                                <p className="text-gray-500 text-sm">Quantity: {item.quantity || 1}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600">
                                            <FaTrash size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Coupon Section */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t pt-4">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="px-4 py-2 rounded border border-gray-300 w-full sm:w-auto"
                                />
                                <button onClick={applyCoupon} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                                    Apply
                                </button>
                                {appliedCoupon && (
                                    <span className="text-green-600 text-sm">
                                        ✅ Coupon <b>{appliedCoupon}</b> applied!
                                    </span>
                                )}
                                {couponError && <span className="text-red-600 text-sm">{couponError}</span>}
                            </div>

                            {/* Pricing Section */}
                            <div className="flex justify-between items-center border-t pt-4">
                                <div className="text-lg text-gray-700 space-y-1">
                                    <div>Subtotal: ₹{getSubtotal()}</div>
                                    {appliedCoupon && <div className="text-green-600">Discount: -₹{getDiscount()}</div>}
                                    <div className="text-xl font-semibold">Total: ₹{getTotal()}</div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={clearCart}
                                        className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        onClick={() => setShowDetailsModal(true)} // NEW
                                        className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Offers Section */}
                    <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-800">Available Offers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {offers.map((offer) => (
                            <div key={offer.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                                <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover" />
                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{offer.title}</h3>
                                    <p className="text-gray-600 text-sm">{offer.description}</p>
                                    <button onClick={() => router.push(`/offers/${offer.id}`)} className="mt-2 inline-block text-blue-600 hover:underline text-sm">
                                        Know More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Address Form Modal */}
            {showDetailsModal && (
                <div className="fixed inset-0 bg-[#a6a8a87c] bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Enter Delivery Details</h2>

                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border rounded-md"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Full Address"
                            className="w-full px-4 py-2 border rounded-md"
                            value={userDetails.address}
                            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 border rounded-md"
                            value={userDetails.phone}
                            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                        />

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                                onClick={() => setShowDetailsModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                                onClick={submitOrder}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
