import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Branding */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold tracking-wider text-blue-400">Devesh Pandey</h2>
                        <p className="text-sm text-gray-300 mt-1">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex space-x-6 text-gray-300 text-sm">
                        <a href="/about" className="hover:text-white transition">About</a>
                        <a href="/contact" className="hover:text-white transition">Contact</a>
                    </div>

                    {/* Socials */}
                    <div className="flex space-x-4">
                        <a href="https://github.com/deveshpandey65" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-xl hover:text-blue-400 transition" />
                        </a>
                        <a href="https://linkedin.com/in/deveshpandey65" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-xl hover:text-blue-400 transition" />
                        </a>
                        <a href="mailto:deveshcse.dev@gmail.com">
                            <FaEnvelope className="text-xl hover:text-blue-400 transition" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
