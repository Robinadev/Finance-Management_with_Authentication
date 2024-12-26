interface BalanceWidgetProps {
    balance: number;
  }
  
  const BalanceWidget = ({ balance }: BalanceWidgetProps) => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Current Balance
        </h2>
        <p className="text-3xl font-bold text-teal-600">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  };
  
  export default BalanceWidget;