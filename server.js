import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {createAdmin} from './controllers/authController.js';
dotenv.config();

class App {
  constructor({MONGO_URI, PORT}) {
    this.PORT = PORT;
    this.MONGO_URI = MONGO_URI;
    this.app = app;

    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(this.MONGO_URI);
      await this.run();
      createAdmin();
    } catch (error) {
      console.log(error);
    }
  }

  async run() {
    return new Promise((resolve, reject) => {
      try {
        this.app.listen(this.PORT, () => {
          const link = `http://localhost:${this.PORT}`
          resolve(link);
          console.log(link);
        });
      } catch (error) {
        console.log(error);
        reject(null)
      }
    })
  };

}

new App({
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT
});


