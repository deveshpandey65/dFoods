'use client';
import { useEffect, useMemo, useState } from "react";
import { NavbarDemo } from "@/components/navbar/nav";
import { GlowingEffectDemo } from "./boxes";
import { CardHoverEffectDemo } from "./cards";
import RestaurantSlider from "./restaurantSlider";
import DishesSlider from "./dishesSlider";
import { heroData, restaurants, topDishes } from "@/lib/data";
import Footer from "@/components/Footer";

export default function Page() {
  const [location, setLocation] = useState(null);
  const foods = restaurants.map((restaurant) => restaurant.items).flat();
  const [sortOption, setSortOption] = useState('rating-desc');
  const [sortOptionFood, setSortOptionFood] = useState('price-asc');

  const parseOpenTime = (timeRange) => {
    // "10:00 AM – 10:00 PM" → "10:00 AM"
    const [start] = timeRange.split('–');
    return new Date(`1970/01/01 ${start.trim()}`);
  };

  const parsePrice = (price) => parseInt(price.replace(/[^\d]/g, ''));

  const sortedFoods = useMemo(() => {
    const data = [...foods];

    if (sortOptionFood === 'price-asc') {
      return data.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOptionFood === 'price-desc') {
      return data.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOptionFood === 'name-asc') {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOptionFood === 'name-desc') {
      return data.sort((a, b) => b.name.localeCompare(a.name));
    }

    return data;
  }, [sortOptionFood]);

  const sortedRestaurants = useMemo(() => {
    const data = [...restaurants];

    if (sortOption === 'rating-asc') {
      return data.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === 'rating-desc') {
      return data.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'open-early') {
      return data.sort(
        (a, b) => parseOpenTime(a.openTime) - parseOpenTime(b.openTime)
      );
    } else if (sortOption === 'open-late') {
      return data.sort(
        (a, b) => parseOpenTime(b.openTime) - parseOpenTime(a.openTime)
      );
    }

    return data;
  }, [sortOption]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ city: "Geolocation not supported", locality: "" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const address = data.address;
          const city = address.city || address.town || address.village || "Unknown City";
          const locality = address.suburb || address.neighbourhood || address.road || "";

          setLocation({ city, locality });
        } catch (err) {
          console.error("Error fetching location:", err);
          setLocation({ city: "Unknown", locality: "" });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation({ city: "Permission denied", locality: "" });
      }
    );
  }, []);

  return (
    <div className="flex flex-col">
      <div className="fixed w-full z-50 h-0">
        <NavbarDemo />
      </div>
      <div className="h-15"></div>

      {/* 📍 Display user location */}
      {location && location.locality&& (
        <div className="text-start pl-[5%] text-sm text-gray-600 py-2 my-4">
          📍 Delivering to: <strong>{location.locality}, {location.city}</strong>
        </div>
      )}

      <div className="px-[5%] z-10">
        <GlowingEffectDemo data={heroData}  />
      </div>

      <div className="px-[5%]">
        <RestaurantSlider data={restaurants} location={location ?location.locality?location.city:'':'' || ``} />
      </div>

      <div className="px-[5%]">
        <DishesSlider data={topDishes} location={location ? location.locality ? location.city : '' : '' || ``} />
      </div>

      <div className="px-[5%]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Explore Restaurants</h2>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-3 py-2 mt-4 md:mt-0 rounded text-sm"
          >
            <option value="rating-desc">Sort by Rating (High to Low)</option>
            <option value="rating-asc">Sort by Rating (Low to High)</option>
            <option value="open-early">Sort by Opening Time (Early)</option>
            <option value="open-late">Sort by Opening Time (Late)</option>
          </select>
        </div>

        <CardHoverEffectDemo data={sortedRestaurants} type={'restaurant'} />
      </div>
      <div className="px-[5%]">
        <div className="flex flex-col md:flex-row  justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Explore Foods</h2>

          </div>
          <div>
            <select
              value={sortOption}
              onChange={(e) => setSortOptionFood(e.target.value)}
              className="border mt-4 md:mt-0 px-3 py-2 rounded text-sm"
            >
              <option value="price-asc">Sort by Price (Low to High)</option>
              <option value="price-desc">Sort by Price (High to Low)</option>
              <option value="name-asc">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
            </select>
          </div>
        </div>

        <CardHoverEffectDemo data={sortedFoods} type={'foods'} />
      </div>

      <Footer />
    </div>
  );
}
