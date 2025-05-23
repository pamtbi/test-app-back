import dotenv from 'dotenv';
dotenv.config();

console.log(`vars: `, process.env);

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const BOT_TOKEN = process.env.BOT_TOKEN || '';