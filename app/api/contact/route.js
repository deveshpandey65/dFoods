import { sendContactEmail } from '@/lib/server/contactemail';

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400 });
        }

        const success = await sendContactEmail({ name, email, message });

        if (!success) {
            return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('API error:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
