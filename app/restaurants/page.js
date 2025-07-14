'use client';
import { useState } from 'react';
import { restaurants } from '@/lib/data'; // Import your restaurant data
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/resizable-navbar';
import { NavbarDemo } from '@/components/navbar/nav';

export default function RestaurantListPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter restaurants based on the search term
    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRestaurantClick = (id) => {
        router.push(`/restaurants/${id}`); // Navigate to the restaurant detail page
    };

    return (
        <div className="bg-white flex flex-col">
            <div className="fixed w-full z-50 h-0">
                <NavbarDemo/>
            </div>
            <div className="h-20"></div>
            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Restaurants</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="border rounded-lg p-2 mb-4 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                            onClick={() => handleRestaurantClick(restaurant.id)}
                        >
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{restaurant.name}</h2>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <FaStar />
                                    <span>{restaurant.rating} .</span>
                                    <span>{restaurant.openTime}</span>
                                </div>
                                <p>{restaurant.address}</p>
                                <p className="text-gray-600 mt-2">{restaurant.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
