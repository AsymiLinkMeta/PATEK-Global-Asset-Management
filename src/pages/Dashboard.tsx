import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, TrendingUp, TrendingDown, CreditCard, Wallet, ArrowLeftRight, DollarSign, PiggyBank, FileText, Plus, Send, ChevronRight, Briefcase, Building2, Home, User } from 'lucide-react';
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
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');

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

  const bankAccounts = accounts.filter(acc => acc.account_type === 'checking' || acc.account_type === 'savings');
  const creditCards = accounts.filter(acc => acc.account_type === 'credit');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Link to="/accounts" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <CreditCard className="w-6 h-6 text-gray-700" />
            <Plus className="w-3 h-3 text-gray-700 absolute top-1 right-1 bg-white rounded-full" />
          </Link>
          <img src="/chase-bank.jpg" alt="Patek Global" className="h-12 w-12 rounded-lg" />
          <Link to="/profile" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-0 mb-6">
          <button
            onClick={() => setAccountType('personal')}
            className={`px-6 py-2 rounded-l-full transition-colors ${
              accountType === 'personal'
                ? 'bg-gray-200 text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setAccountType('business')}
            className={`px-6 py-2 rounded-r-full transition-colors ${
              accountType === 'business'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-400 text-white hover:bg-gray-500'
            }`}
          >
            Business
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
          <Link
            to="/accounts"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-5 h-5 text-primary-600" />
          </Link>
          <Link
            to="/transfer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Send className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-900">Send | Zelle®</span>
          </Link>
          <Link
            to="/accounts"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium text-gray-900">Deposit checks</span>
          </Link>
          <Link
            to="/transactions"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium text-gray-900">Pay bills</span>
          </Link>
        </div>
      </div>

      <div className="px-6 py-6">
        <Link
          to="/transactions"
          className="block bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Snapshot</p>
                <p className="text-sm text-gray-600">
                  Your spending this week: {formatCurrency(totalBalance * 0.05)}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900">Accounts</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <span className="text-gray-600">•••</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Link
              to="/accounts"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200"
            >
              <span className="font-medium text-gray-900">Bank accounts ({bankAccounts.length})</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              to="/accounts"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200"
            >
              <span className="font-medium text-gray-900">Credit cards ({creditCards.length})</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              to="/accounts"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">Link external accounts</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Explore more products</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6 mb-4">
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Credit cards</p>
            </Link>
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Wallet className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Checking</p>
            </Link>
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <PiggyBank className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Savings & CDs</p>
            </Link>
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Work with advisors</p>
            </Link>
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Business</p>
            </Link>
          </div>
          <Link
            to="/accounts"
            className="block text-center py-3 border border-primary-600 text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors"
          >
            Explore products
          </Link>
        </div>
      </div>
    </div>
  );
}
