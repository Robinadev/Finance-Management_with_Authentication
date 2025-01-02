import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BalanceWidget from '../components/BalanceWidget';
import TransactionsList from '../components/Transactions';
import AddTransactionForm from '../components/AddTransctionForm';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialDeposit, setInitialDeposit] = useState<string>(''); // For initial balance input

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login', { replace: true }); // Redirect to login
  };

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
          }
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setBalance(data.balance);
        setTransactions(data.transactions);
        setIsLoading(false);
      }
      catch (err) {
        setError('An unexpected error occurred');
        setIsLoading(false);
      }
  };
  fetchDashboardData();
},[navigate]);

  
  const handleNewTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add transaction');
      }

      const data = await response.json();
      setTransactions((prev) => [data, ...prev]);
      setBalance((prevBalance) => prevBalance + transaction.amount);
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    }
  };

  const handleDeposit = () => {
    const amount = parseFloat(initialDeposit);
    if (!isNaN(amount) && amount > 0) {
      setBalance((prev) => prev + amount);
      setInitialDeposit('');
    } else {
      setError('Please enter a valid deposit amount.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Dashboard</h1>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
            <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            <BalanceWidget balance={balance} />
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">Deposit Initial Balance</h2>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter initial balance"
                />
                <button
                  onClick={handleDeposit}
                  className="ml-2 px-4 py-2 bg-teal-600 text-white rounded-md shadow-sm hover:bg-teal-700"
                >
                  Deposit
                </button>
              </div>
            </div>
            <TransactionsList transactions={transactions} isLoading={isLoading} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <AddTransactionForm onSubmit={handleNewTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
