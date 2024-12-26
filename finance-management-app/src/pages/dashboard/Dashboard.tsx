import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BalanceWidget from '../../components/BalanceWidget'
import TransactionsList from '../../components/Transactions';
import AddTransactionForm from '../../components/AddTransctionForm';

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }
  
      setIsLoading(true);
  
      const response = await fetch('/api/dashboard', { // Remove http://localhost:3000
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
          return;
        }
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setBalance(data.balance);
      setTransactions(data.transactions);
      setError(null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transaction)
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
          return;
        }
        const data = await response.json();
        throw new Error(data.message || 'Failed to add transaction');
      }
  
      // Immediately update the transactions list with the new transaction
      const data = await response.json();
      setTransactions(prevTransactions => [data, ...prevTransactions]);
      
      // Update the balance
      setBalance(prevBalance => prevBalance + transaction.amount);
      
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Financial Dashboard
        </h1>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            <BalanceWidget balance={balance} />
            <TransactionsList 
              transactions={transactions} 
              isLoading={isLoading} 
            />
          </div>
          
          {/* Right column */}
          <div className="lg:col-span-1">
            <AddTransactionForm 
              onSubmit={handleNewTransaction} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;