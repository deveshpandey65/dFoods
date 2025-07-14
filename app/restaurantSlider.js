'use client';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RestaurantSlider = ({ data }) => {
    const router = useRouter();
    const scrollRef = useRef(null);
    const itemWidth = 260;
    const cloneCount = 3;

    const duplicatedData = [
        ...data.slice(-cloneCount),
        ...data,
        ...data.slice(0, cloneCount),
    ];

    useEffect(() => {
        const slider = scrollRef.current;
        let scrollPos = itemWidth * cloneCount;
        let isResetting = false;

        slider.scrollLeft = scrollPos;

        const interval = setInterval(() => {
            if (!slider) return;

            if (!isResetting) {
                scrollPos += itemWidth;
                slider.scrollTo({ left: scrollPos, behavior: 'smooth' });
            }

            if (scrollPos >= itemWidth * (data.length + cloneCount)) {
                isResetting = true;

                // Instantly reset to start (no animation)
                setTimeout(() => {
                    scrollPos = itemWidth * cloneCount;
                    slider.scrollTo({ left: scrollPos, behavior: 'auto' });
                    isResetting = false;
                }, 300); // wait for smooth scroll to finish
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [data]);

    const handleScroll = (direction) => {
        const slider = scrollRef.current;
        if (!slider) return;

        const newScroll = direction === 'next'
            ? slider.scrollLeft + itemWidth
            : slider.scrollLeft - itemWidth;

        slider.scrollTo({ left: newScroll, behavior: 'smooth' });
    };

    return (
        <div className="w-full py-4 relative">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Top restaurant chains in Allahabad</h2>
                <div className="flex gap-2 pr-2">
                    <button
                        onClick={() => handleScroll('prev')}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={() => handleScroll('next')}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hidden"
            >
                {duplicatedData.map((rest, index) => (
                    <div
                        key={index}
                        className="mb-2 min-w-[240px] w-[240px] bg-white shadow hover:shadow-2xl  cursor-pointer rounded-lg overflow-hidden relative"
                        onClick={()=>router.push(`/restaurants/${rest.id}`)}
                    >
                        <div className="relative h-36 w-full">
                            <img
                                src={rest.image}
                                alt={rest.name}
                                className="h-full w-full object-cover"
                            />
                            {rest.price && (
                                <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-2 py-1 text-xs font-medium">
                                    ITEMS AT {rest.price}
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-md truncate">{rest.name}</h3>
                            <div className="flex items-center text-sm text-green-600 font-medium my-1">
                                <FaStar className="mr-1 text-green-600" />
                                {rest.rating} · {rest.openTime}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{rest.categories}</p>
                            <p className="text-sm text-gray-400">{rest.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantSlider;
