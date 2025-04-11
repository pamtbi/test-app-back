import User from '../models/User.js';
import questions from '../data/questions.js';

export const getQuestions = (_, res) => {
  res.json(questions.map(({ correctIndex, ...q }) => q));
};

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid answers format' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let score = 0;

    const detailedAnswers = answers.map(({ question, answer }) => {
      const correct = questions.find(q => q.question === question);
      const isCorrectAnswer = correct && correct.options[correct.correctIndex] === answer;
      if (isCorrectAnswer) score++;
      return {
        question,
        answer,
        isCorrectAnswer,
      };
    });

    user.results.push({ answers: detailedAnswers, score });

    await user.save();

    return res.json({ score });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


