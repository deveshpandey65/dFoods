'use client';
import { useState } from 'react';
import { restaurants } from '@/lib/data';
import { NavbarDemo } from '@/components/navbar/nav';
import { useCart } from '@/context/CartContext';
import AddToCartModel from '@/components/addToCartModel/model';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const router = useRouter();

    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredItems = restaurants.flatMap(r =>
        r.items.filter(i =>
            i.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(item => ({
            ...item,
            restaurantName: r.name,
        }))
    );

    const showBoth = filteredRestaurants.length > 0 && filteredItems.length > 0;
    const showRestaurantsOnly = filteredRestaurants.length > 0 && filteredItems.length === 0;
    const showItemsOnly = filteredItems.length > 0 && filteredRestaurants.length === 0;

    const handleOpenModal = (item) => {
        const minimalItem = {
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
        };
        setSelectedItem(minimalItem);
        setQuantity(1);
        setModalOpen(true);
    };

    const handleAdd = () => {
        addToCart({ ...selectedItem, quantity });
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="fixed top-0 left-0 w-full z-50">
                <NavbarDemo />
            </div>
            <div className='h-10'></div>
            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4">
                <h1 className="text-5xl font-extrabold mb-8 text-gray-900 text-center">Find Your Craving 🍴</h1>

                <input
                    type="text"
                    placeholder="Search for restaurants or dishes..."
                    className="w-full p-4 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {(showBoth || showRestaurantsOnly || showItemsOnly) ? (
                    <div className={`grid ${showBoth ? 'md:grid-cols-2 gap-12' : 'grid-cols-1'} mt-12`}>
                        {/* Restaurants Column */}
                        {(showBoth || showRestaurantsOnly) && (
                            <div>
                                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Restaurants</h2>
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                                    {filteredRestaurants.map((restaurant) => (
                                        <motion.div
                                            key={restaurant.id}
                                            onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                                            className="rounded-xl bg-white shadow-lg hover:shadow-xl border transition"
                                            whileHover={{ scale: 1.03 }}
                                        >
                                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-40 object-cover rounded-t-xl" />
                                            <div className="p-4 space-y-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                                                <p className="text-sm text-gray-600">{restaurant.offer}</p>
                                                <p className="text-xs text-gray-500">{restaurant.address}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Items Column */}
                        {(showBoth || showItemsOnly) && (
                            <div>
                                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Dishes</h2>
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                                    {filteredItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="relative rounded-xl bg-white shadow-lg hover:shadow-xl border transition"
                                            whileHover={{ scale: 1.03 }}
                                        >
                                            <button
                                                onClick={() => handleOpenModal(item)}
                                                className="absolute top-0 right-3 bg-white text-black border shadow text-xl font-extrabold w-10 h-10 rounded-b-md hover:bg-gray-300 transition"
                                            >
                                                +
                                            </button>
                                            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-xl" />
                                            <div className="p-4 space-y-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">From: {item.restaurantName}</p>
                                                <p className="text-blue-600 font-bold">{item.price}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center mt-16 text-gray-500 text-lg">
                        No matching restaurants or dishes found.
                    </div>
                )}
            </div>

            {/* Add To Cart Modal */}
            {modalOpen && selectedItem && (
                <AddToCartModel
                    setModalOpen={setModalOpen}
                    quantity={quantity}
                    handleAdd={handleAdd}
                    setQuantity={setQuantity}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
}
