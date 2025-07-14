'use client';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('EMAIL');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendOtp = async () => {
        setLoading(true);
        const res = await fetch('/api/auth/send-otp', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
        setLoading(false);
        if (res.ok) setStep('OTP');
        else setError('Failed to send OTP');
    };

    const verifyOtp = async () => {
        setLoading(true);
        const res = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
            localStorage.setItem('token', data.token);
            alert('✅ Logged in!');
            window.location.href = '/'; 
        } else {
            setError(data.message || 'Verification failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login with Email OTP</h2>

                {step === 'EMAIL' ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border p-3 rounded mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full border p-3 rounded mb-4"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </>
                )}

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
