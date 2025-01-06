import React, { useState, FormEvent } from 'react';

interface TransactionFormData {
  description: string;
  amount: string;
  date: string;
}

interface AddTransactionFormProps {
  onSubmit: (transaction: { description: string; amount: number; date: string }) => Promise<void>;
}

const AddTransactionForm = ({ onSubmit }: AddTransactionFormProps) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      setError('Please enter a valid amount');
      return false;
    }

    if (!formData.date) {
      setError('Date is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const amountValue = parseFloat(formData.amount);
      const transaction = {
        description: formData.description.trim(),
        amount: amountValue,
        date: formData.date,
      };

      await onSubmit(transaction);

      // Reset form on success
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-medium text-white mb-4">Add Transaction</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Description
          </label>
          <input
            type="text"
            id="description"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-white">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            required
            step="0.01"
            placeholder="Enter a positive or negative amount"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
