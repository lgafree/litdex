import React from 'react';

interface TransactionsTabProps {
  user: any; // Replace 'any' with a proper user type
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ user }) => {
  return (
    <div className="p-4">
      <div className="grid gap-4 text-sm">
        <p><strong>Last Transaction:</strong> {user.last_pay_ts && new Date(user.last_pay_ts * 1000).getFullYear() !== 0 ? new Date(user.last_pay_ts * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown'}</p>
      </div>
    </div>
  );
};

export default TransactionsTab;
