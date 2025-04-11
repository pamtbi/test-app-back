import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' },
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

