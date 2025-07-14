import { NavbarDemo } from "@/components/navbar/nav";
import { GlowingEffectDemo } from "./boxes";
import { CardHoverEffectDemo } from "./cards";
import RestaurantSlider from "./restaurantSlider";
import DishesSlider from "./dishesSlider";
import { heroData, restaurants, topDishes } from "@/lib/data";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="fixed w-full z-50 h-0">
        <NavbarDemo />
      </div>
      <div className="h-20"></div>
      
      <div className="px-[5%] z-10">
        
        <GlowingEffectDemo data={heroData}/>
      </div>

      <div className="px-[5%]">
        <RestaurantSlider data={restaurants}/>
      </div>
      <div className="px-[5%]">
        <DishesSlider data={topDishes} />
      </div>

      <div className="px-[5%]">
        <CardHoverEffectDemo/>
      </div>
      <Footer/>
    </div>
  );
}
