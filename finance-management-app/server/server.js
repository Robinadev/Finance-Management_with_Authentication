const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv-safe');
const winston = require('winston');
//const sanitize = require('mongo-sanitize');

// Load environment variables
dotenv.config();

// Configure logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'server.log' }),
  ],
});

const app = express();

// Environment variables
const { MONGODB_URI, JWT_SECRET, CLIENT_URL, NODE_ENV } = process.env;

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => {
    logger.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  });
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, default: 'General' },
  type: { type: String, enum: ['income', 'expense'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        status: 'error',
        message: 'All fields are required',
        details: {
          username: !username ? 'Username is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Enhanced password validation
    const passwordValidation = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password)
    };

    if (!Object.values(passwordValidation).every(Boolean)) {
      return res.status(400).json({
        status: 'error',
        message: 'Password does not meet security requirements',
        details: {
          requirements: {
            minLength: 'At least 8 characters',
            hasUpperCase: 'At least one uppercase letter',
            hasLowerCase: 'At least one lowercase letter',
            hasNumbers: 'At least one number',
            hasSpecialChar: 'At least one special character (@$!%*?&)'
          },
          failed: Object.entries(passwordValidation)
            .filter(([_, valid]) => !valid)
            .map(([requirement]) => requirement)
        }
      });
    }

    // Check if user exists with improved error messages
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Account already exists',
        details: {
          email: existingUser.email === email ? 'Email already registered' : null,
          username: existingUser.username === username ? 'Username already taken' : null
        }
      });
    }

    // Generate salt and hash password with increased security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with enhanced security measures
    const user = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date()
    });

    await user.save();

    // Remove sensitive data from response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.__v;

    res.status(201).json({
      status: 'success',
      message: 'Account created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during registration',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email });
    
    // User not found
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Verify password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id,
        email: user.email,
        username: user.username 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send success response
    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during login',
      details: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
const validateTransaction = (transaction) => {
  const { description, amount, date, type } = transaction;
  if (!description || typeof description !== 'string') return 'Description is required.';
  if (!amount || typeof amount !== 'number') return 'Valid amount is required.';
  if (!date || isNaN(Date.parse(date))) return 'Valid date is required.';
  if (!type || !['income', 'expense'].includes(type)) return 'Type must be "income" or "expense".';
  return null;
};


// Transaction routes
// Transaction routes
app.post('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const { description, amount, date, category, type } = req.body;
    
    const validationError = validateTransaction({ description, amount, date, type });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      description,
      amount,
      date: new Date(date),
      category: category || 'General',
      type: type || 'income',
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    logger.error('Transaction creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/transactions', authenticateToken, async (req, res) => {
   try {
     const transactions = await Transaction.find({ userId: req.user.id })
       .sort({ date: -1 })
       .limit(parseInt(req.query.limit) || 10);

     res.json({ transactions });
   } catch (error) {
     console.error('Transaction fetch error:', error);
     res.status(500).json({ message: 'Server error' });
   }
 });

// Dashboard route
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    
    const balance = transactions.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
    }, 0);

    const recentTransactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(5);

    res.json({
      balance,
      transactions: recentTransactions
    });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});