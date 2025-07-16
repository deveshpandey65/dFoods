'use client';
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AddToCartModel from "../addToCartModel/model";

export const HoverEffect = ({ items, className, type }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
      const { addToCart } = useCart();
      const [modalOpen, setModalOpen] = useState(false);
      const [quantity, setQuantity] = useState(1);
      const [selectedItem, setSelectedItem] = useState(null);
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
    <div className={cn("grid grid-cols-1 md:grid-cols-2 p-4 lg:grid-cols-4 w-fit", className)}>
      {items.map((item, idx) => (
        <div
          onClick={() => {
            if (type === 'restaurant') {
              // Navigate to restaurant page
              window.location.href = `/restaurants/${item.id}`;
            }
          }}
          key={idx}
          className="relative group block p-4 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <Card>
            <div className="relative">
              <img
                className="w-70 h-40 object-cover rounded-t-xl"
                src={item.image}
                alt={item.name}
              />
              
                {
                  type !== 'restaurant' && (
                  <div
                    onClick={(e) => {handleOpenModal(item)
                      e.stopPropagation();
                      e.preventDefault();
                    }

                    }
                    className=" cursor-pointer absolute top-0 right-4 h-8 w-8 bg-gray-500 bg-opacity-80 text-white px-2  rounded-b-md font-bold text-lg "
                  >
                    +
                  </div>
                )
                }
              {item.offer && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {item.offer}
                </div>
              )}
            </div>

            <div className="px-3 pb-3 space-y-1">
              <div className="flex justify-between items-center">

                <h3 className="pt-2 text-base font-semibold text-black">{item.name}</h3>
                {
                  type !== 'restaurant' && (
                    <div
                      onClick={(e) => {
                        handleOpenModal(item)
                        e.stopPropagation();
                        e.preventDefault();
                      }

                      }
                      className=" cursor-pointer top-0 right-4 h-8 w-12 bg-gray-500 bg-opacity-80 text-white px-2 py-1 rounded-b-md font-bold text-md "
                    >
                      ADD
                    </div>
                  )
                }
              </div>

              {type === 'restaurant' ? (
                <>
                  <p className="text-sm text-gray-700">
                    <span className="text-green-600 font-semibold">★ {item.rating}</span> · {item.openTime}
                  </p>
                  <p className="text-sm text-gray-500">{item.item}</p>
                  <p className="text-sm text-gray-400">{item.address}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500">{item.description || "Delicious & fresh"}</p>
                  <p className="text-sm text-gray-600 font-semibold">{item.price}</p>
                </>
              )}
            </div>
          </Card>
        </div>
      ))}
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
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-white border border-gray-200 dark:border-white/[0.2] relative z-20",
        className
      )}
    >
      <div className="relative z-50">{children}</div>
    </div>
  );
};
