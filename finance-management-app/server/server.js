const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Temporary storage (replace with database in production)
const users = [];

// Signup endpoint
app.post('/api/auth/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if user exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({
      message: 'User already exists'
    });
  }

  // Store user (use password hashing in production)
  users.push({ username, email, password });

  res.status(201).json({
    message: 'User created successfully'
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      token: `test-token-${Date.now()}`,
      user: {
        email: user.email,
        username: user.username
      },
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials'
    });
  }
});

// Protected route example
app.get('/api/dashboard', (req, res) => {
  // Check authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  // Return mock dashboard data
  res.json({
    balance: 5000.00,
    transactions: [
      {
        id: '1',
        description: 'Salary',
        amount: 3000,
        date: '2024-03-01'
      },
      {
        id: '2',
        description: 'Rent',
        amount: -1000,
        date: '2024-03-02'
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// ... existing code ...

// Store transactions in memory (replace with database in production)
const transactions = [];

// Get transactions endpoint
app.get('/api/transactions', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  // Return last 5 transactions
  res.json({
    transactions: transactions.slice(-5)
  });
});

// Add transaction endpoint
app.post('/api/transactions', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  const { description, amount, date } = req.body;

  // Validate input
  if (!description || typeof amount !== 'number' || !date) {
    return res.status(400).json({
      message: 'Invalid transaction data'
    });
  }

  const transaction = {
    id: Date.now().toString(),
    description,
    amount,
    date
  };

  transactions.push(transaction);

  // Return the new transaction
  res.status(201).json(transaction);
});

// ... rest of the server code ...