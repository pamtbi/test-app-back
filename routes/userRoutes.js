import express from "express";
import auth from '../middleware/auth.js';
import {getUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/", auth, getUser);

export default router;

