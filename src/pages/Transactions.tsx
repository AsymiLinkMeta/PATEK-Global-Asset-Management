import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, Filter } from 'lucide-react';

interface Transaction {
  id: string;
  transaction_type: string;
  category: string;
  amount: number;
  description: string;
  merchant: string;
  transaction_date: string;
  status: string;
}

interface Account {
  id: string;
  account_name: string;
}

export default function Transactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, [user]);

  useEffect(() => {
    if (accounts.length > 0) {
      loadTransactions();
    }
  }, [selectedAccount, accounts]);

  const loadAccounts = async () => {
    if (!user) return;

    const { data: accountsData } = await supabase
      .from('accounts')
      .select('id, account_name')
      .eq('user_id', user.id);

    if (accountsData && accountsData.length > 0) {
      setAccounts(accountsData);
      setSelectedAccount(accountsData[0].id);
    } else {
      setLoading(false);
    }
  };

  const loadTransactions = async () => {
    if (selectedAccount === 'all') {
      const accountIds = accounts.map(acc => acc.id);
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .in('account_id', accountIds)
        .order('transaction_date', { ascending: false });

      if (data) setTransactions(data);
    } else {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('account_id', selectedAccount)
        .order('transaction_date', { ascending: false });

      if (data) setTransactions(data);
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
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const groupByDate = (transactions: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.transaction_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
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

  const groupedTransactions = groupByDate(transactions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-500 text-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-4">Activity</h1>

        {accounts.length > 0 && (
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="all" className="text-gray-900">All Accounts</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id} className="text-gray-900">
                {account.account_name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="px-6 py-6">
        {transactions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(([date, transactions]) => (
              <div key={date}>
                <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">{date}</h3>
                <div className="bg-white rounded-2xl shadow-lg divide-y divide-gray-100">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              transaction.transaction_type === 'credit'
                                ? 'bg-green-100'
                                : 'bg-red-100'
                            }`}
                          >
                            {transaction.transaction_type === 'credit' ? (
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.merchant}</p>
                            <p className="text-sm text-gray-500 capitalize">{transaction.category}</p>
                            {transaction.description && (
                              <p className="text-xs text-gray-400 mt-1">{transaction.description}</p>
                            )}
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
                          <p className={`text-xs mt-1 ${
                            transaction.status === 'completed' ? 'text-green-600' :
                            transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {transaction.status}
                          </p>
                        </div>
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
