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
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Recent Transactions
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount >= 0 ? '+' : ''}
                    ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No transactions yet. Add your first transaction!
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default TransactionsList;