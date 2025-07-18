'use client';
import Footer from '@/components/Footer';
import { NavbarDemo } from '@/components/navbar/nav';
import { useCart } from '@/context/CartContext';

export default function OrdersPage() {
    const { orders } = useCart();

    return (
        <div className="flex flex-col">
            <div className="fixed w-full z-50 h-0">
                <NavbarDemo />
            </div>

            <div className="h-20" />

            <div className="max-w-6xl mx-auto py-10 px-4">
                <h1 className="text-4xl font-bold mb-10 text-gray-800">📦 Your Orders</h1>

                {orders.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">
                        You have not placed any orders yet.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order, index) => (
                            <div key={index} className="bg-white shadow-md rounded-xl p-6 space-y-4">
                                {/* Order header */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">🧾 Order #{order.id}</h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Placed on: <span className="text-gray-600">{order.date}</span>
                                        </p>
                                    </div>
                                    <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                                        Completed
                                    </span>
                                </div>

                                {/* User Info */}
                                <div className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-700 space-y-1">
                                    <p><strong>Name:</strong> {order.userDetails?.name || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {order.userDetails?.phone || 'N/A'}</p>
                                    <p><strong>Address:</strong> {order.userDetails?.address || 'N/A'}</p>
                                </div>

                                {/* Items List */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="border rounded-lg p-4 flex gap-4 bg-gray-50 hover:shadow transition">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-20 w-20 object-cover rounded-md border"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <p className="text-base font-semibold text-gray-800">{item.name}</p>
                                                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-bold text-blue-600 mt-2">{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="text-right mt-4 text-lg font-semibold text-gray-800">
                                    Total Amount: ₹{order.total || '0'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
