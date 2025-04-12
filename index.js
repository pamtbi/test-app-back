import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createAdmin } from './controllers/authController.js';
const PORT = process.env.PORT || 3000;
dotenv.config();

async function App() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await createAdmin();
    console.log("createAdmin passed");
    app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
}

App();

export default app;