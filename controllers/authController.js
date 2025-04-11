import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username: name, password } = req.body;
    const username = name.toLowerCase().trim();

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const isUser = await User.findOne({ username });

    if (isUser) {
      return res.status(400).json({ message: 'User already exists with this username' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' });
  
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};

export const createAdmin = async () => {
  try {
    const adminUsername = 'admin'; 
    const adminPassword = 'adminpassword';

    const existingAdmin = await User.findOne({ username: adminUsername });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const admin = new User({
        username: adminUsername,
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      console.log('Admin user created');
    };

  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};
