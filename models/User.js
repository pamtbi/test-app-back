import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'user' },
  telegramId: { type: Number, unique: false },
  telegramName: { type: String },
  results: [{
    score: Number,
    answers: [{
      question: String,
      answer: String,
      isCorrectAnswer: Boolean
    }],
    date: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model('User', userSchema);
export default User;
