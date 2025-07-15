import jwt from 'jsonwebtoken';
import { verifyStoredOtp, clearOtp } from '@/lib/otpStore';

export async function POST(req) {
    const { email, otp } = await req.json();

    if (!email || !otp) {
        return new Response(JSON.stringify({ success: false, message: 'Email and OTP required' }), {
            status: 400,
        });
    }

    const isValid = await verifyStoredOtp(email, otp);

    if (isValid === false) {
        console.log(`OTP verification failed for ${email}: ${otp}`);
        return new Response(JSON.stringify({ success: false, message: 'Invalid or expired OTP' }), {
            status: 400,
        });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '3d' });

    await clearOtp(email);

    return new Response(JSON.stringify({ success: true, token }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
