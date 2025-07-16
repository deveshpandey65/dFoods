import nodemailer from 'nodemailer';

export const sendOrderConfirmationEmail = async (userDetails, orderDetails) => {
    console.log('Sending order confirmation email...');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    const itemListHTML = orderDetails.items.map(
        (item) => `
            <tr>
                <td style="padding: 8px 0;">${item.name}</td>
                <td style="padding: 8px 0; text-align: center;">x${item.quantity}</td>
                <td style="padding: 8px 0; text-align: right;">${item.price}</td>
            </tr>
        `
    ).join('');

    const mailOptions = {
        from: `"dFood" <${process.env.SMTP_EMAIL}>`,
        to: userDetails.email,
        subject: `🧾 dFood: Order Confirmation #${orderDetails.id}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 24px; border-radius: 8px;">
                <h2 style="color: #333;">Thank you for your order, ${userDetails.name || 'Customer'}! 🍽️</h2>
                
                <p style="font-size: 16px;">Here are the details of your recent order from <strong>dFood</strong>:</p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th align="left">Item</th>
                            <th align="center">Qty</th>
                            <th align="right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemListHTML}
                    </tbody>
                </table>

                <p style="font-size: 16px; margin-top: 24px;">
                    <strong>Total:</strong> ₹${orderDetails.total}<br/>
                    <strong>Date:</strong> ${orderDetails.date}
                </p>

                <p style="font-size: 16px;">
                    <strong>Delivery Address:</strong><br/>
                    ${userDetails.address}
                </p>

                <hr style="margin: 24px 0;" />

                <p style="font-size: 14px; color: #777;">
                    We’re preparing your delicious food right now!<br/>
                    For any queries, feel free to contact us.<br/><br/>
                    — Team dFood ❤️
                </p>
            </div>
        `
    };

    console.log('Mail Options:', mailOptions);

    await transporter.sendMail(mailOptions);
};
