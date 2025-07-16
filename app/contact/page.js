'use client';
import { NavbarDemo } from '@/components/navbar/nav';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Message sent successfully! We'll get back to you soon.");
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert("❌ Failed to send message: " + data.error);
            }
        } catch (err) {
            console.error('Submit error:', err);
            alert("❌ Something went wrong. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-blue-600">Sending...</div>;
    }


    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <NavbarDemo />
            </div>
            <div className="h-20" />

            <main className="max-w-4xl mx-auto px-4 py-10 flex-grow">
                <h1 className="text-4xl font-bold mb-6 text-blue-700">Contact Us</h1>

                <p className="text-lg mb-6">
                    We'd love to hear from you! Whether you have a question, feedback, or just want to say hello — drop us a message below.
                </p>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold mb-1">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-semibold mb-1">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block font-semibold mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="mt-10 bg-blue-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                    <p><strong>Name:</strong> Devesh Pandey</p>
                    <p><strong>Email:</strong> <a href="mailto:deveshcse.dev@gmail.com" className="text-blue-700 underline">deveshcse.dev@gmail.com</a></p>
                    <p><strong>Phone:</strong> +91 9451127786</p>
                    <p><strong>Location:</strong> Prayagraj, Uttar Pradesh, India</p>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
