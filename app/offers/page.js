'use client';
import { useState } from 'react';
import { offers } from '@/lib/data'; // Import your offers data
import { FaTag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { NavbarDemo } from '@/components/navbar/nav';
import Footer from '@/components/Footer';

export default function OffersPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter offers based on the search term
    const filteredOffers = offers.filter(offer =>
        offer.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOfferClick = (id) => {
        router.push(`/offers/${id}`); // Navigate to the offer detail page
    };

    return (
        <div className="bg-white flex flex-col">
            <div className="fixed w-full z-50 h-0">
                <NavbarDemo/>
            </div>
            <div className="h-20"></div>
            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Current Offers</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search offers..."
                    className="border rounded-lg p-2 mb-4 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredOffers.map((offer) => (
                        <div
                            key={offer.id}
                            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                            onClick={() => handleOfferClick(offer.id)}
                        >
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{offer.title}</h2>
                                <div className="flex items-center gap-1 text-green-500">
                                    <FaTag />
                                    <span>{offer.description}</span>
                                </div>
                                <p className="text-gray-600 mt-2">{offer.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
