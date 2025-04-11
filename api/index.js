import app from '../app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createAdmin } from '../controllers/authController.js';
dotenv.config();

// async function App() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");
//     await createAdmin();
//     console.log("createAdmin passed");
//     app.listen(3000, () => {
//       console.log("Server ready on port 3000.");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// App();

// export default app;

export default async function handler(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    
    await createAdmin();
    console.log("createAdmin passed");
    
    res.status(200).json({ message: 'Server ready on Vercel' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}