'use client';
import { useParams } from 'next/navigation';
import { offers } from '@/lib/data'; // Import your offers data
import { NavbarDemo } from '@/components/navbar/nav';

export default function OfferDetailPage() {
    const params = useParams();
    const offerId = parseInt(params.offer); // Get the offer ID from the URL parameters
    const offer = offers.find((o) => o.id === offerId); // Find the offer by ID

    if (!offer) {
        return <div className="text-center text-red-500">Offer not found!</div>; // Handle case where offer is not found
    }

    return (
        <div className="bg-white flex flex-col">
            <div className="fixed w-full z-50 h-0">
                <NavbarDemo/>
            </div>
            <div className="h-20"></div>
            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{offer.title}</h1>
                <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-2">{offer.description}</p>
                <p className="text-gray-800 font-semibold">{offer.details}</p>
            </div>
        </div>
    );
}
