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

  useEffect(() => {
    loadData();
  }, [accountId, user]);

  const loadData = async () => {
    if (!user || !accountId) return;

    const { data: accountData } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', accountId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (accountData) {
      setAccount(accountData);

      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('account_id', accountId)
        .order('transaction_date', { ascending: false })
        .limit(20);

      if (transactionsData) setTransactions(transactionsData);
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
            onClick={() => navigate('/accounts')}
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
          <p className="text-primary-100 text-sm mb-2">Available Balance</p>
          <p className="text-4xl font-semibold mb-6">{formatCurrency(account.balance)}</p>

          <div className="flex gap-3">
            <Link
              to="/transfer"
              className="flex-1 bg-white text-primary-600 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-5 h-5" />
              Transfer
            </Link>
            <Link
              to="/transactions"
              className="flex-1 bg-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              Pay
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
