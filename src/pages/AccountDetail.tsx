import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowLeftRight, DollarSign, MoreHorizontal } from 'lucide-react';

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  account_name: string;
  balance: number;
  currency: string;
  status: string;
  creditLimit?: number;
}

interface Transaction {
  id: string;
  transaction_type: string;
  category: string;
  amount: number;
  description: string;
  merchant: string;
  transaction_date: string;
}

export default function AccountDetail() {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const specificAccounts = {
    '5201': {
      id: '1',
      account_number: '5201',
      account_type: 'checking',
      account_name: 'SAPPHIRE CHECKING',
      balance: 15234.50,
      currency: 'USD',
      status: 'active'
    },
    '9030': {
      id: '2',
      account_number: '9030',
      account_type: 'savings',
      account_name: 'PREMIER SAVINGS',
      balance: 48752.30,
      currency: 'USD',
      status: 'active'
    },
    '5900': {
      id: '3',
      account_number: '5900',
      account_type: 'checking',
      account_name: 'CPC CHECKING',
      balance: 3421.75,
      currency: 'USD',
      status: 'active'
    },
    '9933': {
      id: '4',
      account_number: '9933',
      account_type: 'credit',
      account_name: 'FREEDOM UNLIMITED',
      balance: -1234.50,
      currency: 'USD',
      status: 'active',
      creditLimit: 10000
    },
    '2456': {
      id: '5',
      account_number: '2456',
      account_type: 'credit',
      account_name: 'SAPPHIRE PREFERRED',
      balance: -2567.80,
      currency: 'USD',
      status: 'active',
      creditLimit: 15000
    },
    '2464': {
      id: '6',
      account_number: '2464',
      account_type: 'credit',
      account_name: 'SAPPHIRE RESERVED',
      balance: -890.25,
      currency: 'USD',
      status: 'active',
      creditLimit: 25000
    }
  };

  const mockTransactions: { [key: string]: Transaction[] } = {
    '5201': [
      {
        id: '1',
        transaction_type: 'debit',
        category: 'shopping',
        amount: 127.45,
        description: 'Purchase',
        merchant: 'Amazon',
        transaction_date: new Date().toISOString()
      },
      {
        id: '2',
        transaction_type: 'debit',
        category: 'dining',
        amount: 45.20,
        description: 'Dinner',
        merchant: 'Olive Garden',
        transaction_date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        transaction_type: 'credit',
        category: 'income',
        amount: 2500.00,
        description: 'Salary',
        merchant: 'Employer Direct Deposit',
        transaction_date: new Date(Date.now() - 172800000).toISOString()
      }
    ],
    '9030': [
      {
        id: '4',
        transaction_type: 'credit',
        category: 'transfer',
        amount: 500.00,
        description: 'Transfer from checking',
        merchant: 'Internal Transfer',
        transaction_date: new Date().toISOString()
      },
      {
        id: '5',
        transaction_type: 'credit',
        category: 'income',
        amount: 15.30,
        description: 'Interest',
        merchant: 'Interest Payment',
        transaction_date: new Date(Date.now() - 2592000000).toISOString()
      }
    ],
    '5900': [
      {
        id: '6',
        transaction_type: 'debit',
        category: 'services',
        amount: 89.99,
        description: 'Software subscription',
        merchant: 'Adobe',
        transaction_date: new Date().toISOString()
      },
      {
        id: '7',
        transaction_type: 'debit',
        category: 'utilities',
        amount: 125.50,
        description: 'Electric bill',
        merchant: 'Power Company',
        transaction_date: new Date(Date.now() - 86400000).toISOString()
      }
    ],
    '9933': [
      {
        id: '8',
        transaction_type: 'debit',
        category: 'shopping',
        amount: 234.99,
        description: 'Online purchase',
        merchant: 'Amazon',
        transaction_date: new Date().toISOString()
      },
      {
        id: '9',
        transaction_type: 'debit',
        category: 'dining',
        amount: 67.50,
        description: 'Dinner',
        merchant: 'Restaurant',
        transaction_date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '10',
        transaction_type: 'debit',
        category: 'groceries',
        amount: 156.78,
        description: 'Groceries',
        merchant: 'Whole Foods',
        transaction_date: new Date(Date.now() - 172800000).toISOString()
      }
    ],
    '2456': [
      {
        id: '11',
        transaction_type: 'debit',
        category: 'travel',
        amount: 567.00,
        description: 'Flight booking',
        merchant: 'United Airlines',
        transaction_date: new Date().toISOString()
      },
      {
        id: '12',
        transaction_type: 'debit',
        category: 'dining',
        amount: 125.30,
        description: 'Fine dining',
        merchant: 'The Capital Grille',
        transaction_date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '13',
        transaction_type: 'debit',
        category: 'shopping',
        amount: 89.99,
        description: 'Online purchase',
        merchant: 'Best Buy',
        transaction_date: new Date(Date.now() - 172800000).toISOString()
      }
    ],
    '2464': [
      {
        id: '14',
        transaction_type: 'debit',
        category: 'travel',
        amount: 450.00,
        description: 'Hotel stay',
        merchant: 'Marriott',
        transaction_date: new Date().toISOString()
      },
      {
        id: '15',
        transaction_type: 'debit',
        category: 'dining',
        amount: 78.50,
        description: 'Lunch',
        merchant: 'Local Bistro',
        transaction_date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '16',
        transaction_type: 'credit',
        category: 'refund',
        amount: 125.00,
        description: 'Purchase return',
        merchant: 'Nordstrom',
        transaction_date: new Date(Date.now() - 172800000).toISOString()
      }
    ]
  };

  useEffect(() => {
    loadData();
  }, [accountId, user]);

  const loadData = async () => {
    if (!accountId) return;

    if (specificAccounts[accountId as keyof typeof specificAccounts]) {
      setAccount(specificAccounts[accountId as keyof typeof specificAccounts]);
      setTransactions(mockTransactions[accountId] || []);
    }

    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const groupTransactionsByDate = (transactions: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.transaction_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    return groups;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <p className="text-gray-500 mb-4">Account not found</p>
        <button
          onClick={() => navigate('/accounts')}
          className="text-primary-600 font-medium"
        >
          Back to Accounts
        </button>
      </div>
    );
  }

  const transactionGroups = groupTransactionsByDate(transactions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">{account.account_name}</h1>
            <p className="text-sm text-gray-500">
              <span className="capitalize">{account.account_type}</span> •••• {account.account_number.slice(-4)}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 text-white">
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              {account.account_number === '9933' && (
                <img
                  src="/freedom_unlimited-removebg-preview_(1).png"
                  alt="Freedom Unlimited"
                  className="w-20 h-12 object-contain"
                />
              )}
              {account.account_number === '2464' && (
                <img
                  src="/chase_sapphire_reserve_06_24_25-removebg-preview_(1).png"
                  alt="Sapphire Reserve"
                  className="w-20 h-12 object-contain"
                />
              )}
              {account.account_number === '2456' && (
                <img
                  src="/chase-sapphire-preferred-lead.jpg"
                  alt="Sapphire Preferred"
                  className="w-20 h-12 object-contain"
                />
              )}

              <div className="flex-1 text-right">
                {account.account_type === 'credit' ? (
                  <>
                    <p className="text-primary-100 text-sm mb-2">Current Balance</p>
                    <p className="balance-display">{formatCurrency(Math.abs(account.balance))}</p>
                  </>
                ) : (
                  <>
                    <p className="text-primary-100 text-sm mb-2">Available Balance</p>
                    <p className="balance-display">{formatCurrency(account.balance)}</p>
                  </>
                )}
              </div>
            </div>

            {account.account_type === 'credit' && (
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-primary-100">Available Credit</p>
                  <p className="font-semibold">{formatCurrency((account.creditLimit || 0) - Math.abs(account.balance))}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary-100">Credit Limit</p>
                  <p className="font-semibold">{formatCurrency(account.creditLimit || 0)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              to="/transfer"
              className="flex-1 bg-white text-primary-600 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {account.account_type === 'credit' ? 'Pay' : 'Transfer'}
            </Link>
            <Link
              to="/transactions"
              className="flex-1 bg-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              {account.account_type === 'credit' ? 'Transactions' : 'Pay'}
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
          <Link to="/transactions" className="text-primary-600 text-sm font-medium">
            See all
          </Link>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(transactionGroups).map(([date, transactions]) => (
              <div key={date}>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {date}
                </p>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.transaction_type === 'credit'
                              ? 'bg-green-50'
                              : 'bg-gray-100'
                          }`}
                        >
                          {transaction.transaction_type === 'credit' ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.merchant}</p>
                          <p className="text-sm text-gray-500 capitalize">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.transaction_type === 'credit'
                              ? 'text-green-600'
                              : 'text-gray-900'
                          }`}
                        >
                          {transaction.transaction_type === 'credit' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
