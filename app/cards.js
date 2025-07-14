"use client"
import { restaurants } from "@/lib/data";
import { HoverEffect } from "../components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
    return (
        <div className="flex   justify-center items-center">
            <HoverEffect items={restaurants} />
        </div>
    );
}
export const items = [
    {
        name: "Burger King",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/18/90239691-25e8-4701-abab-2878abd08091_437010.jpg",
        rating: "4.3",
        item: "Burgers, American",
        address: "Civil Lines",
        offer: "60% OFF UPTO ₹110",
        link: "#"
    },
    {
        name: "Pizza Hut",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/9/a1344928-c2cc-4223-92b9-d13f2fe9a749_508862.JPG",
        rating: "4.2",
        item: "Pizza, Italian",
        address: "Hazratganj",
        offer: "Flat ₹100 OFF",
        link: "#"
    },
    {
        name: "McDonald's",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/1/9/40408979-8937-40d6-9ca9-d9af67a23391_253769.JPG",
        rating: "4.4",
        item: "Fast Food, Beverages",
        address: "Aliganj",
        link: "#"
    },
    {
        name: "Subway",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/5ece7fb2c731a0e1807ec5b40eda94f3",
        rating: "4.1",
        item: "Healthy Food, Sandwiches",
        address: "Gomti Nagar",
        link: "#"
    },
    {
        name: "Paradise Biryani",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/krn2uala8oo04m4bigz2",
        rating: "4.5",
        item: "Biryani, Indian",
        address: "Mahanagar",
        offer: "40% OFF UPTO ₹120",
        link: "#"
    },
    {
        name: "Burger King",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/18/90239691-25e8-4701-abab-2878abd08091_437010.jpg",
        rating: "4.3",
        item: "Burgers, American",
        address: "Civil Lines",
        offer: "60% OFF UPTO ₹110",
        link: "#"
    },
    {
        name: "Pizza Hut",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/9/a1344928-c2cc-4223-92b9-d13f2fe9a749_508862.JPG",
        rating: "4.2",
        item: "Pizza, Italian",
        address: "Hazratganj",
        offer: "Flat ₹100 OFF",
        link: "#"
    },
    {
        name: "McDonald's",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/1/9/40408979-8937-40d6-9ca9-d9af67a23391_253769.JPG",
        rating: "4.4",
        item: "Fast Food, Beverages",
        address: "Aliganj",
        link: "#"
    },
    {
        name: "Subway",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/5ece7fb2c731a0e1807ec5b40eda94f3",
        rating: "4.1",
        item: "Healthy Food, Sandwiches",
        address: "Gomti Nagar",
        link: "#"
    },
    {
        name: "Paradise Biryani",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/krn2uala8oo04m4bigz2",
        rating: "4.5",
        item: "Biryani, Indian",
        address: "Mahanagar",
        offer: "40% OFF UPTO ₹120",
        link: "#"
    }
];
  