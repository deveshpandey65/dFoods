'use client';
import { NavbarDemo } from '@/components/navbar/nav';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <NavbarDemo />
            </div>
            <div className="h-20" />

            {/* Content */}
            <main className="max-w-6xl mx-auto px-4 py-10 flex-grow">
                <h1 className="text-4xl font-bold mb-6 text-blue-600">About dFoods</h1>

                <p className="text-lg mb-4">
                    <strong>dFoods</strong> is a modern food ordering web application built with the vision of connecting people to their favorite meals quickly and efficiently. Whether you're hungry for a quick snack or planning a full-course meal from your favorite restaurant, dFood ensures a seamless ordering experience.
                </p>

                <p className="text-lg mb-4">
                    With features like real-time cart management, restaurant discovery, location-based listings, coupon integration, and order history tracking — dFood is designed to make your food journey smarter and faster.
                </p>

                <p className="text-lg mb-4">
                    This project is developed using powerful and scalable technologies including <span className="font-medium">Next.js, React, Tailwind CSS</span> on the frontend, and <span className="font-medium">Node.js, MongoDB</span> for backend and database management. The application follows component-based architecture, clean code principles, and responsive design standards.
                </p>

                <p className="text-lg mb-6">
                    I built this platform as part of my personal portfolio to showcase full-stack capabilities and UI/UX design understanding.
                </p>

                <div className="bg-white p-6 rounded-lg shadow border max-w-2xl mt-10">
                    <h2 className="text-2xl font-bold text-blue-700 mb-2">About the Developer</h2>
                    <p className="text-lg">
                        Hi 👋, I’m <strong>Devesh Pandey</strong>, a B.Tech Computer Science student passionate about full-stack web development and problem-solving. I enjoy building scalable applications that make everyday life easier through technology. This project is one of many where I aim to combine functionality with a delightful user experience.
                    </p>

                    <p className="text-md mt-4 text-gray-600">
                        📍 Location: Prayagraj, Uttar Pradesh <br />
                        📧 Email: <a href="mailto:deveshcse.dev@gmail.com" className="text-blue-600 hover:underline">deveshcse.dev@gmail.com</a> <br />
                        📞 Contact: +91 9451127786
                    </p>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
