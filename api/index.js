import app from '../app.js';
import serverless from 'serverless-http';
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

    const response = await serverless(app)(req, res);
    return response;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}