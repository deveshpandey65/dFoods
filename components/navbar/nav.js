"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";


export function NavbarDemo() {
    const router = useRouter();
    const { cart } = useCart(); // ⬅️ Get cart from context
    const { orders } = useCart();
    const navItems = [
        {
            name: "Restaurants",
            link: "/restaurants",
        },
        {
            name: "Dishes",
            link: "/items",
        },
        {
            name: "Offers",
            link: "/offers",
        },
        {
            name: (
                <span className="relative inline-block">
                    Cart
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                            {cart.length}
                        </span>
                    )}
                </span>
            ),
            link: "/cart",
        },
        orders.length >1?{
            name: "Orders",
            link: "/orders",
        }:'',
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="relative z-50 w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />

                    <div className="hidden md:flex items-center gap-4 ml-auto">
                        <button
                            onClick={() => router.push("/search")}
                            className="z-60 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >Search</button>

                        <NavItems items={navItems} />
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {/* Mobile Search Input */}
                        <div className="w-full mb-4">
                            <button
                                onClick={() => router.push("/search")}
                                className="z-60 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >Search</button>
                        </div>

                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={typeof item.link === "string" ? item.link : "#"}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}

                        <div className="flex w-full flex-col gap-4 mt-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    router.push("/cart");
                                }}
                                variant="primary"
                                className="w-full relative"
                            >
                                Cart
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
