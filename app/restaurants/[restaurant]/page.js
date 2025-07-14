'use client';
import { PinContainer } from '@/components/ui/3d-pin';
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { AnimatedPinDemo } from './card';
import { restaurants } from '@/lib/data';
import { useParams } from 'next/navigation';
import { NavbarDemo } from '@/components/navbar/nav';
import Footer from '@/components/Footer';

export default function RestaurantDescriptionPage({ params }) {
    console.log(restaurants);
    params = useParams();
    const restaurant = restaurants.find((r) => r.id.toString() === params.restaurant);

    console.log(params.restaurant, restaurant);
    return (
        <div className="bg-white flex flex-col">
            <div className="fixed w-full z-50 h-0">
                <NavbarDemo />
            </div>
            <div className="h-20"></div>
            <div className="w-full max-w-6xl mx-auto px-4 py-6">

                {/* Hero Section */}
                <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                        <div className="text-white space-y-2">
                            <div className="flex items-center gap-2">
                                <img src={restaurant.logo} alt="logo" className="h-12 w-12 object-contain" />
                                <h1 className="text-2xl md:text-3xl font-bold">{restaurant.name}</h1>
                            </div>
                            <div className="flex items-center gap-2 text-yellow-300 font-medium">
                                <FaStar />
                                <span>{restaurant.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">About</h2>
                    <p className="text-gray-600">{restaurant.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow">
                            <FaMapMarkerAlt className="text-gray-600" />
                            <span>{restaurant.address}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow">
                            <FaPhoneAlt className="text-gray-600" />
                            <span>{restaurant.contact}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow">
                            <FaClock className="text-gray-600" />
                            <span>{restaurant.openTime}</span>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg shadow">
                            <span className="font-medium">Categories: </span>
                            {restaurant.categories}
                        </div>
                    </div>
                </div>

                {/* Popular Items */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Popular Items</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {console.log(restaurant)}
                        {restaurant.items.map((item, index) => (
                            <div key={index} className='m-6'>
                                <AnimatedPinDemo item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
