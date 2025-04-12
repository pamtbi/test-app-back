import express from 'express';
import { register, login, authTelegram } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/telegram', authTelegram);

export default router;
