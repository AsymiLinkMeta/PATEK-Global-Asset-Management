import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, TrendingUp, TrendingDown, CreditCard, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  account_name: string;
  balance: number;
  currency: string;
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

interface Profile {
  full_name: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();

    if (profileData) setProfile(profileData);

    const { data: accountsData } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (accountsData && accountsData.length > 0) {
      setAccounts(accountsData);

      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('account_id', accountsData[0].id)
        .order('transaction_date', { ascending: false })
        .limit(5);

      if (transactionsData) setRecentTransactions(transactionsData);
    }

    setLoading(false);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

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
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-500 text-white px-6 pt-12 pb-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary-100 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold">{profile?.full_name || 'User'}</h1>
          </div>
          <img src="/chase-bank.jpg" alt="Patek Global" className="h-12 w-12 rounded-lg" />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-primary-100 text-sm">Total Balance</p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:text-primary-100"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-4xl font-bold mb-4">
            {showBalance ? formatCurrency(totalBalance) : '••••••'}
          </p>
          <div className="flex gap-3">
            <Link
              to="/transfer"
              className="flex-1 bg-white text-primary-500 py-2 px-4 rounded-lg font-medium text-center hover:bg-primary-50 transition-colors"
            >
              Transfer
            </Link>
            <Link
              to="/accounts"
              className="flex-1 bg-white/20 text-white py-2 px-4 rounded-lg font-medium text-center hover:bg-white/30 transition-colors"
            >
              Accounts
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-20">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/transfer"
              className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
            >
              <Wallet className="w-8 h-8 text-primary-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Send Money</span>
            </Link>
            <Link
              to="/accounts"
              className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
            >
              <CreditCard className="w-8 h-8 text-primary-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">My Cards</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Link to="/transactions" className="text-primary-500 text-sm font-medium">
              See all
            </Link>
          </div>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
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
                      <p className="text-sm text-gray-500">{formatDate(transaction.transaction_date)}</p>
                    </div>
                  </div>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
