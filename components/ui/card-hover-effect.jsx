import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 p-4 lg:grid-cols-4 w-fit", className)}>
      {items.map((item, idx) => (
        <a
          href={`/restaurants/${item.id}`}
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
              {item.offer && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {item.offer}
                </div>
              )}
            </div>

            <div className="p-3 space-y-1">
              <h3 className="text-base font-semibold text-black">{item.name}</h3>
              <p className="text-sm text-gray-700">
                <span className="text-green-600 font-semibold">★ {item.rating}</span> · {item.time}
              </p>
              <p className="text-sm text-gray-500">{item.item}</p>
              <p className="text-sm text-gray-400">{item.address}</p>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
};


export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full  overflow-hidden bg-white border border-gray-200 dark:border-white/[0.2]  relative z-20",
        className
      )}>
      <div className="relative z-50">
        <div className="">{children}</div>
      </div>
    </div>
  );
};
// export const CardTitle = ({
//   className,
//   children
// }) => {
//   return (
//     <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
//       {children}
//     </h4>
//   );
// };
// export const CardDescription = ({
//   className,
//   children
// }) => {
//   return (
//     <p
//       className={cn(" w-70 p-4 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
//       {children}
//     </p>
//   );
// };
