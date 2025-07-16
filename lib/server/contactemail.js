import nodemailer from 'nodemailer';

export const sendContactEmail = async ({ name, email, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email to the website owner
        const adminMailOptions = {
            from: `"dFood Contact" <${process.env.SMTP_EMAIL}>`,
            to: process.env.SMTP_EMAIL,
            subject: `New Contact Message from ${name}`,
            text: `
📬 New message from the contact form:

👤 Name: ${name}
📧 Email: ${email}

📝 Message:
${message}
      `,
        };

        // Auto-response to the sender
        const userMailOptions = {
            from: `"dFood Team" <${process.env.SMTP_EMAIL}>`,
            to: email,
            subject: `Thanks for contacting dFood!`,
            text: `
Hello ${name},

Thank you for reaching out to us at dFood. We've received your message and our team will get back to you as soon as possible.

Here’s a copy of your message:
--------------------------------------
${message}
--------------------------------------

We appreciate your interest in dFood!

Best regards,  
dFood Support Team
      `,
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        console.log('Admin and user emails sent successfully.');
        return true;
    } catch (error) {
        console.error('Error sending emails:', error);
        return false;
    }
};
