import { connectToDB } from './mongodb'; // We'll write this helper next

const COLLECTION_NAME = 'otp_store';

// Save OTP
export const storeOtp = async (email, otp) => {
    const db = await connectToDB();
    const collection = db.collection(COLLECTION_NAME);

    await collection.updateOne(
        { email },
        {
            $set: {
                otp,
                createdAt: new Date(),
            },
        },
        { upsert: true }
    );
    console.log(`Stored OTP for ${email}: ${otp}`);
};

// Verify OTP
export const verifyStoredOtp = async (email, otp) => {
    const db = await connectToDB();
    const collection = db.collection(COLLECTION_NAME);

    const record = await collection.findOne({ email });

    if (!record) return false;

    const expiresInMs = 5 * 60 * 1000;
    const isExpired = Date.now() - new Date(record.createdAt).getTime() > expiresInMs;
    console.log(`Verifying OTP for ${email}: ${otp}, Stored: ${record.otp}, Expired: ${isExpired},verify: ${String(record.otp) === String(otp)}`);
    if (isExpired=== false) {
        if(String(record.otp) === String(otp)){
        return true;}
    }
    console.log(`OTP verification failed for ${email}: ${otp}`);
    return false;
};

// Clear OTP
export const clearOtp = async (email) => {
    const db = await connectToDB();
    const collection = db.collection(COLLECTION_NAME);
    await collection.deleteOne({ email });
};
