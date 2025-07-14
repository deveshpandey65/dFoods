import nodemailer from 'nodemailer';

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};
