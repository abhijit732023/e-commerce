import dotenv from 'dotenv';
dotenv.config();
const config = {
    mongoURL: process.env.VITE_MONGO_URL,
    screteCode: process.env.VITE_SECRET_CODE,
    backendURl: process.env.VITE_BACKEND_URL,
    payment_key_id: process.env.VITE_KEY_ID,
    payment_key_secret: process.env.VITE_KEY_SECRET,
    email_user: process.env.VITE_EMAIL_USER_ID,
    email_password: process.env.VITE_EMAIL_PASSWORD,
    port: process.env.VITE_PORT || 3000,
    frontendURL:process.env.VITE_FRONTEND_URL,
};
export default config;