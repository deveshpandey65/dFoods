'use client';
import { useEffect, useState } from "react";
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
      {location && (
        <div className="text-start pl-[5%] text-sm text-gray-600 py-2 my-4">
          📍 Delivering to: <strong>{location.locality}, {location.city}</strong>
        </div>
      )}

      <div className="px-[5%] z-10">
        <GlowingEffectDemo data={heroData}  />
      </div>

      <div className="px-[5%]">
        <RestaurantSlider data={restaurants} location={location?.city || ``} />
      </div>

      <div className="px-[5%]">
        <DishesSlider data={topDishes} location={location?.city || ``} />
      </div>

      <div className="px-[5%]">
        <CardHoverEffectDemo data={restaurants} type={'restaurant'} />
      </div>
      <div className="px-[5%]">
        <CardHoverEffectDemo data={foods} type={'foods'} />
      </div>

      <Footer />
    </div>
  );
}
