// Updated Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Chart } from 'react-charts';
import BalanceWidget from '../../components/BalanceWidget';
import TransactionsList from '../../components/Transactions';
import AddTransactionForm from '../../components/AddTransctionForm';
import Toast from '../../components/Toast'

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
  const [initialDeposit, setInitialDeposit] = useState<string>('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:3000/api/dashboard', {
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
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleNewTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      const response = await fetch('http://localhost:3000/api/transactions', {
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

  const data = [
    {
      label: 'Balance',
      data: transactions.map((txn, index) => [index, txn.amount]),
    },
  ];

  const series = {
    type: 'bar',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
     { <Toast message={error} onClose={() => setError(null)} /> }

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md shadow-md hover:from-teal-600 hover:to-cyan-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceWidget balance={balance} />
          <div className="col-span-2 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transactions Overview</h2>
            <div style={{ height: '300px' }}>
           {/* //   <Chart data={data} series={series} axes={[
                { primary: true, type: 'linear', position: 'bottom' },
                { type: 'linear', position: 'left' },
              ]} /> */}
            </div>
          </div>
        </div>

        <TransactionsList transactions={transactions} />
        <AddTransactionForm onSubmit={handleNewTransaction} />
      </div>
    </div>
  );
};

export default Dashboard;
