'use client';
import React, { useRef, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useCart } from '@/context/CartContext';
import AddToCartModel from '@/components/addToCartModel/model';

const DishesSlider = ({ data }) => {
    const { addToCart } = useCart();
    const scrollRef = useRef(null);
    const itemWidth = 260;
    const cloneCount = 3;

    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const duplicatedData = [
        ...data.slice(-cloneCount),
        ...data,
        ...data.slice(0, cloneCount),
    ];

    useEffect(() => {
        const slider = scrollRef.current;
        let scrollPos = itemWidth * cloneCount;
        let isResetting = false;
        if (slider) slider.scrollLeft = scrollPos;

        const interval = setInterval(() => {
            if (!slider || isResetting) return;
            scrollPos += itemWidth;
            slider.scrollTo({ left: scrollPos, behavior: 'smooth' });
            if (scrollPos >= itemWidth * (data.length + cloneCount)) {
                isResetting = true;
                setTimeout(() => {
                    scrollPos = itemWidth * cloneCount;
                    slider.scrollTo({ left: scrollPos, behavior: 'auto' });
                    isResetting = false;
                }, 300);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [data]);

    const handleScroll = (direction) => {
        const slider = scrollRef.current;
        if (!slider) return;
        slider.scrollBy({ left: direction === 'left' ? -itemWidth : itemWidth, behavior: 'smooth' });
    };

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        console.log("Selected Item:", item);
        setQuantity(1);
        setModalOpen(true);
    };

    const handleAdd = () => {
        addToCart({ ...selectedItem, quantity });
        setModalOpen(false);
    };

    return (
        <div className="w-full py-4 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Famous Dishes in Allahabad</h2>
                <div className="space-x-2">
                    <button onClick={() => handleScroll('left')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <MdChevronLeft size={24} />
                    </button>
                    <button onClick={() => handleScroll('right')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <MdChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div ref={scrollRef} className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hidden">
                {duplicatedData.map((rest, index) => (
                    <div key={index} className="min-w-[240px] bg-white mb-2 shadow rounded-lg overflow-hidden relative">
                        <div className="relative h-36 w-full">
                            <div
                                onClick={() => handleOpenModal(rest)}
                                className="cursor-pointer absolute flex items-center justify-center w-8 h-8 top-0 right-4 rounded-b-sm z-20 bg-white font-bold shadow"
                            >
                                +
                            </div>
                            <img src={rest.image} alt={rest.name} className="h-full w-full object-cover" />
                            {rest.price && (
                                <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-2 py-1 text-xs font-medium">
                                    ITEMS AT {rest.price}
                                </div>
                            )}
                        </div>
                        <div className="px-3 pb-3">
                            <div className='flex flex-row items-center justify-between'>
                                <h3 className="font-semibold text-md truncate">{rest.name}</h3>
                                <div 
                                    onClick={() => handleOpenModal(rest)}
                                    className="cursor-pointer text-sm text-white font-bold truncate px-4 py-1 rounded-b-md bg-gray-700 ">
                                        ADD
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-green-600 font-medium my-1">
                                <FaStar className="mr-1 text-green-600" />
                                {rest.rating} · {rest.time}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{rest.restaurant}</p>
                            <p className="text-sm text-gray-600 truncate">{rest.category}</p>
                            <p className="text-sm text-gray-400">{rest.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && selectedItem && (
                <AddToCartModel 
                    setModalOpen={setModalOpen} 
                    quantity={quantity} 
                    handleAdd={handleAdd} 
                    setQuantity={setQuantity} 
                    selectedItem={selectedItem}/>
            )}
        </div>
    );
};

export default DishesSlider;
