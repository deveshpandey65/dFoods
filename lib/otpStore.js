// Persist across reloads using globalThis
if (!globalThis.otpStore) {
    globalThis.otpStore = new Map();
}

export const otpStore = globalThis.otpStore;

export const storeOtp = (email, otp) => {
    otpStore.set(email, { otp, createdAt: Date.now() });
    console.log('Storing OTP for', email, '=>', otp);
    console.log('Current store:', Array.from(otpStore.entries()));
};

export const verifyStoredOtp = (email, otp) => {
    const record = otpStore.get(email);
    console.log('Verifying OTP for', email, '=>', otp);
    console.log('Record:', record);
    if (!record) return false;

    const expiresInMs = 5 * 60 * 1000;
    const isExpired = Date.now() - record.createdAt > expiresInMs;

    return !isExpired && String(record.otp) === String(otp); // Ensure type-safe compare
};

export const clearOtp = (email) => otpStore.delete(email);
