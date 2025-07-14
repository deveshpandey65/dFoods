import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold">Devesh Pandey</h2>
                        <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="/about" className="hover:underline">About Us</a>
                        <a href="/contact" className="hover:underline">Contact</a>
                        <a href="/privacy" className="hover:underline">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
