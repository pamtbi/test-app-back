import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String, default: 'user' },
  telegramId: { type: Number, unique: true },
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
