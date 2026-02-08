import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, TrendingUp, TrendingDown, CreditCard, Wallet, ArrowLeftRight, DollarSign, PiggyBank, FileText } from 'lucide-react';
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getFirstName = () => {
    return profile?.full_name?.split(' ')[0] || 'User';
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
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 text-base mb-1">{getGreeting()},</p>
            <h1 className="text-2xl font-semibold text-gray-900">{getFirstName()}</h1>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {showBalance ? <Eye className="w-6 h-6 text-gray-600" /> : <EyeOff className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Accounts</h2>
          {accounts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500">No accounts yet</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
              {accounts.map((account) => (
                <Link
                  key={account.id}
                  to="/accounts"
                  className="flex-shrink-0 w-80 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-primary-100 text-sm mb-1">{account.account_name}</p>
                      <p className="text-xs text-primary-200">
                        •••• {account.account_number.slice(-4)}
                      </p>
                    </div>
                    <CreditCard className="w-8 h-8 text-white/80" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-100 mb-1">Available balance</p>
                    <p className="text-3xl font-semibold">
                      {showBalance ? formatCurrency(account.balance) : '••••••'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            <Link
              to="/transfer"
              className="flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mb-2 hover:bg-primary-100 transition-colors">
                <ArrowLeftRight className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-xs text-gray-700 text-center">Transfer</span>
            </Link>
            <Link
              to="/transactions"
              className="flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mb-2 hover:bg-primary-100 transition-colors">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-xs text-gray-700 text-center">Pay</span>
            </Link>
            <Link
              to="/accounts"
              className="flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mb-2 hover:bg-primary-100 transition-colors">
                <PiggyBank className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-xs text-gray-700 text-center">Save</span>
            </Link>
            <Link
              to="/transactions"
              className="flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mb-2 hover:bg-primary-100 transition-colors">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-xs text-gray-700 text-center">Statements</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Activity</h2>
            <Link to="/transactions" className="text-primary-600 text-sm font-medium">
              See all
            </Link>
          </div>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3">
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
                    <p className="text-xs text-gray-500">{formatDate(transaction.transaction_date)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
