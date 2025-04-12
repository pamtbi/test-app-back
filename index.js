import app from './app.js';
import mongoose from 'mongoose';
import { createAdmin } from './controllers/authController.js';

import { PORT, MONGO_URI } from './env.js';

async function App() {
  try {
    await mongoose.connect(MONGO_URI);
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