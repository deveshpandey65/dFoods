'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddToCartModel({ selectedItem, setQuantity, quantity, handleAdd, setModalOpen }) {
    const router = useRouter();

    // Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem('token'); // or use cookies
        if (!token) {
            alert('Please login to add items to cart.');
            setModalOpen(false);
            router.push('/login');
        }
    }, [router, setModalOpen]);

    return (
        <div className="fixed inset-0 w-screen h-screen z-50 bg-[#11111194] bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-2">{selectedItem.name}</h2>
                <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-gray-700 mb-4">{selectedItem.description || "Please specify quantity to proceed."}</p>
                <div className="flex items-center gap-2 mb-4">
                    <label htmlFor="quantity" className="font-medium">
                        Quantity:
                    </label>
                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => handleAdd(e)}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
