export const sendOTP = async (phone) => {
    console.log('Sending OTP to', phone);
    await new Promise((r) => setTimeout(r, 1000));
    return true; 
};

export const verifyOTP = async (phone, otp) => {
    console.log('Verifying OTP for', phone, '=>', otp);
    await new Promise((r) => setTimeout(r, 1000));
    return otp === '123456';
};
