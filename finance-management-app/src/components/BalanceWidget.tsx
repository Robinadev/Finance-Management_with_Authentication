import React from 'react';

interface BalanceWidgetProps {
  balance: number;
}

const BalanceWidget = ({ balance }: BalanceWidgetProps) => {
  return (
    <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg shadow-lg p-6 text-center transform transition hover:shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">Current Balance</h2>
      <p className="text-4xl font-extrabold text-white">
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-white text-teal-600 font-medium rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition"
        onClick={() => alert('View more details coming soon!')}
      >
        View Details
      </button>
    </div>
  );
};

export default BalanceWidget;
