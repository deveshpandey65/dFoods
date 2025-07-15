import { generateOtp, sendEmail } from '@/lib/server/email';
import { storeOtp } from '@/lib/otpStore';

export async function POST(req) {
    const { email } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    const otp = generateOtp();

    try {
        await sendEmail(email, otp);
        await storeOtp(email, otp);
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), {
            status: 500,
        });
    }
}
