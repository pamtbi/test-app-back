import express from 'express';
import auth from '../middleware/auth.js';
import { getQuestions, submitQuiz } from '../controllers/quizController.js';

const router = express.Router();

router.get('/', auth, getQuestions);
router.post('/submit', auth, submitQuiz);

export default router;
