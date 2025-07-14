'use client';
import { useState } from 'react';
import { NavbarDemo } from '@/components/navbar/nav';
import { PinContainer } from '@/components/ui/3d-pin';
import { restaurants } from '@/lib/data';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function ItemsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const search = searchTerm.toLowerCase();

    // Filter restaurants and items by restaurant name, category, or item name
    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search) ||
        restaurant.categories.toLowerCase().includes(search) ||
        restaurant.items.some(item =>
            item.name.toLowerCase().includes(search)
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <NavbarDemo />
            </div>

            {/* Spacing after fixed navbar */}
            <div className="h-20" />

            {/* Search Bar */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Explore Restaurants 🍽️</h1>
                <input
                    type="text"
                    placeholder="Search for restaurants, categories, or items..."
                    className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg transition mb-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Restaurants */}
            <div className="max-w-7xl mx-auto px-4 space-y-24  pb-20">
                {filteredRestaurants.map((restaurant) => {
                    // Filter menu items if user is searching
                    const filteredItems = search
                        ? restaurant.items.filter((item) =>
                            item.name.toLowerCase().includes(search)
                        )
                        : restaurant.items;

                    return (
                        <motion.div
                            key={restaurant.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col mr-2 md:flex-row shadow-xl rounded-xl overflow-hidden bg-white border border-gray-200"
                        >
                            {/* Restaurant Sidebar */}
                            <div className="md:w-[20%]  bg-gradient-to-br from-white to-slate-100 p-6 space-y-3 border-r">
                                <img
                                    src={restaurant.logo}
                                    alt="Logo"
                                    className="w-20 h-20 rounded-full object-cover border shadow-md"
                                />
                                <h2 className="text-2xl font-bold text-gray-800">{restaurant.name}</h2>
                                <p className="text-sm text-gray-600">{restaurant.categories}</p>
                                <p className="text-sm text-gray-500">{restaurant.address}</p>
                                <p className="text-sm text-gray-500">📞 {restaurant.contact}</p>
                                <p className="text-sm text-gray-500">🕐 {restaurant.openTime}</p>
                                <p className="text-green-600 font-semibold">{restaurant.offer}</p>
                            </div>

                            {/* Menu Section */}
                            <div className="flex-1 p-10 bg-white">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6 underline underline-offset-4 decoration-blue-500">
                                    {filteredItems.length > 0 ? 'Menu' : 'No matching items'}
                                </h3>

                                <motion.div
                                    className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                        hidden: {},
                                        show: {
                                            transition: { staggerChildren: 0.1 },
                                        },
                                    }}
                                >
                                    {filteredItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0 },
                                            }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <PinContainer
                                                item={item}
                                                title={item.name}
                                                containerClassName="h-64"
                                                className="w-56"
                                            >
                                                <div className="flex flex-col items-center text-center space-y-2">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-32 w-32 object-cover rounded-lg border shadow hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <h4 className="text-md font-semibold text-gray-700">{item.name}</h4>
                                                    <p className="text-blue-600 font-bold">{item.price}</p>
                                                </div>
                                            </PinContainer>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* If no result */}
                {filteredRestaurants.length === 0 && (
                    <p className="text-center text-gray-500 text-lg mt-20">No matching restaurants or items found.</p>
                )}
            </div>
            <Footer/>
        </div>
    );
}
