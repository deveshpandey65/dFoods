import { NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/server/sendOrderConfirmationEmail';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userDetails, orderDetails } = body;

        if (!userDetails?.email || !orderDetails?.items) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log('Order Details:', orderDetails);
        console.log('User Details:', userDetails);

        await sendOrderConfirmationEmail(userDetails, orderDetails);

        console.log('Order confirmation email sent successfully from API');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
