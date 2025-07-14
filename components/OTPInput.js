'use client';
import React from 'react';

const OTPInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter OTP"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border p-3 rounded text-center tracking-widest text-lg"
        />
    );
};

export default OTPInput;
