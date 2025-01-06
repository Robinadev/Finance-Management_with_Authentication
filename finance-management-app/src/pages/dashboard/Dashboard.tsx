import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BalanceWidget from '../../components/BalanceWidget';
import AddTransactionForm from '../../components/AddTransctionForm';
import TransactionsList from '../../components/Transactions';

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState<string>(''); // For deposit input
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const handleAddDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid deposit amount.');
      return;
    }

    // Update balance and add transaction
    setBalance((prevBalance) => prevBalance + amount);
    setTransactions((prev) => [
      {
        id: `txn-${Date.now()}`,
        description: 'Deposit',
        amount,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    // Clear input and error
    setDepositAmount('');
    setError(null);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        // Ensure an initial balance exists
        setBalance(data.balance ?? 0);
        setTransactions(data.transactions ?? []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Balance Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Balance</h2>
            <BalanceWidget balance={balance} />
            <div className="mt-4">
              <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                Deposit Amount
              </label>
              <input
                type="number"
                id="deposit"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter deposit amount"
              />
              <button
                className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 w-full"
                onClick={handleAddDeposit}
              >
                Add Deposit
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {/* Add Transaction Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
            <AddTransactionForm
              onSubmit={async (transaction) => {
                if (balance + transaction.amount < 0) {
                  setError('Insufficient balance for this transaction.');
                  return;
                }

                setTransactions((prev) => [transaction, ...prev]);
                setBalance((prevBalance) => prevBalance + transaction.amount);
                setError(null);
              }}
            />
          </div>
        </div>

        {/* Transactions Section */}
        <div className="mt-6">
          <TransactionsList transactions={transactions} isLoading={isLoading} />
        </div>

        {/* Logout Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
