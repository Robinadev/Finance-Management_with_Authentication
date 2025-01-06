import React from 'react';
import { Tooltip } from '@mui/material'; // For tooltips
import { FaInfoCircle } from 'react-icons/fa'; // For icons

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionsList = ({ transactions, isLoading = false }: TransactionsListProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-indigo-300">
        <h2 className="text-lg font-bold text-white flex items-center">
          Recent Transactions
          <Tooltip title="View the most recent transactions in your account" arrow>
            <FaInfoCircle className="ml-2 text-indigo-200 cursor-pointer" />
          </Tooltip>
        </h2>
      </div>

      <div className="divide-y divide-indigo-200">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center px-6 py-4 bg-white hover:bg-indigo-50 transition-colors duration-200"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-sm font-bold ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.amount >= 0 ? '+' : ''}
                ${Math.abs(transaction.amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          ))
        ) : (
          <div className="px-6 py-4 text-center text-indigo-200 font-medium">
            No transactions yet. Add your first transaction!
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
