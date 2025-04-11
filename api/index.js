import app from '../app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createAdmin } from '../controllers/authController.js';

dotenv.config();

let connected = false;

export default async function handler(req, res) {
  if (!connected) {
    await mongoose.connect(process.env.MONGO_URI);
    await createAdmin();
    connected = true;
  }

  app(req, res);
}
