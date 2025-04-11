import app from '../app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createAdmin } from '../controllers/authController.js';

dotenv.config();

let connected = false;

async function App() {
  await mongoose.connect(process.env.MONGO_URI);
  await createAdmin();
  app.listen(3000, () => {
    console.log("Server ready on port 3000.");
    connected = true;
  });
}

App();

export default app;