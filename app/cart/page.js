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

    const validCoupons = {
        SAVE20: 0.2,
        FLAT100: 100,
        FREEDELIVERY: 50,
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ''));
            return total + price * (item.quantity || 1);
        }, 0);
    };

    const getDiscount = () => {
        const subtotal = getSubtotal();

        if (appliedCoupon) {
            const value = validCoupons[appliedCoupon];

            if (typeof value === 'number') {
                return value < 1 ? Math.floor(subtotal * value) : Math.min(subtotal, value);
            }
        }

        return 0;
    };

    const getTotal = () => {
        return Math.max(getSubtotal() - getDiscount(), 0);
    };

    const applyCoupon = () => {
        if (validCoupons[couponCode.toUpperCase()]) {
            setAppliedCoupon(couponCode.toUpperCase());
            setCouponError('');
        } else {
            setAppliedCoupon(null);
            setCouponError('Invalid coupon code.');
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;
        placeOrder();
        alert('Order placed successfully!');
        router.push('/orders');
    };

    return (
        <div className='flex flex-col'>
            <div className="fixed top-0 left-0 w-full z-50">
                <NavbarDemo />
            </div>

            {/* Spacing after fixed navbar */}
            <div className="h-20" />
            <div className="bg-gray-100 min-h-screen">
                <div className="w-full max-w-6xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">Your Cart</h1>

                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg">
                            Your cart is empty. Add some items to checkout.
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow p-6 space-y-6">
                            <ul className="divide-y">
                                {cart.map((item) => (
                                    <li key={item.item_id} className="flex justify-between items-center py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                                <p className="text-gray-600">Price: {item.price}</p>
                                                <p className="text-gray-500 text-sm">Quantity: {item.quantity || 1}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() => removeFromCart(item.id)}
                                        >
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
                                <button
                                    onClick={applyCoupon}
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Apply
                                </button>
                                {appliedCoupon && (
                                    <span className="text-green-600 text-sm">
                                        ✅ Coupon <b>{appliedCoupon}</b> applied!
                                    </span>
                                )}
                                {couponError && (
                                    <span className="text-red-600 text-sm">{couponError}</span>
                                )}
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
                                        onClick={handleCheckout}
                                        className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Available Offers */}
                    <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-800">Available Offers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {offers.map((offer) => (
                            <div
                                key={offer.id}
                                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                            >
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {offer.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{offer.description}</p>
                                    <button
                                        className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                                        onClick={() => router.push(`/offers/${offer.id}`)}
                                    >
                                        Know More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
