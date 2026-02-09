import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, CreditCard, Wallet, ArrowLeftRight, DollarSign, PiggyBank, Plus, Send, ChevronRight, ChevronDown, Briefcase, Building2, Home, User, Calendar, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  account_name: string;
  balance: number;
  currency: string;
  credit_limit: number;
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
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [bankAccountsExpanded, setBankAccountsExpanded] = useState(false);
  const [creditCardsExpanded, setCreditCardsExpanded] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

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

    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    if (count) setNotificationCount(count);

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

  const specificBankAccounts = [
    { name: 'SAPPHIRE CHECKING', accountNumber: '5201', balance: 204599.36 },
    { name: 'PREMIER SAVINGS', accountNumber: '9030', balance: 3025784.20 },
    { name: 'CPC CHECKING', accountNumber: '5900', balance: 816821.47 }
  ];

  const specificCreditCards = [
    { name: 'FREEDOM UNLIMITED', accountNumber: '9933', balance: -3809.10, creditLimit: 10000 },
    { name: 'SAPPHIRE PREFERRED', accountNumber: '2456', balance: -873.45, creditLimit: 15000 },
    { name: 'SAPPHIRE RESERVED', accountNumber: '2464', balance: -4812.62, creditLimit: 25000 }
  ];

  const getCardImage = (name: string) => {
    if (name.includes('FREEDOM')) return '/freedom_unlimited-removebg-preview_(1).png';
    if (name.includes('PREFERRED')) return '/chase-sapphire-preferred-lead.jpg';
    if (name.includes('RESERVE')) return '/chase_sapphire_reserve_06_24_25-removebg-preview_(1).png';
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Link to="/accounts" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <CreditCard className="w-6 h-6 text-gray-700" />
            <Plus className="w-3 h-3 text-gray-700 absolute top-1 right-1 bg-white rounded-full" />
          </Link>
          <img src="/chase-bank.jpg" alt="Chase" className="h-12 w-12 rounded-lg" />
          <div className="flex items-center gap-2">
            <Link to="/notifications" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-6 h-6 text-gray-700" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative bg-gray-200 rounded-full p-1">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full transition-all duration-300 ease-in-out shadow-sm ${
                accountType === 'personal' ? 'left-1' : 'left-[calc(50%+2px)]'
              }`}
            />
            <button
              onClick={() => setAccountType('personal')}
              className={`relative z-10 px-8 py-2 rounded-full transition-colors ${
                accountType === 'personal'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => navigate('/business')}
              className={`relative z-10 px-8 py-2 rounded-full transition-colors ${
                accountType === 'business'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              Business
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
          <Link
            to="/accounts"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-5 h-5 text-primary-600" />
          </Link>
          <Link
            to="/zelle"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Send className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-600">Send | Zelle®</span>
          </Link>
          <Link
            to="/deposit-check"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium text-primary-600">Deposit checks</span>
          </Link>
          <Link
            to="/pay-bills"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium text-primary-600">Pay bills</span>
          </Link>
          <Link
            to="/wire-transfer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium text-primary-600">Wire transfer</span>
          </Link>
        </div>
      </div>

      <div className="px-6 py-6">
        <Link
          to="/spending-insights"
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
                  Your spending this week: {formatCurrency(23836.72)}
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
            <button
              onClick={() => setBankAccountsExpanded(!bankAccountsExpanded)}
              className={`w-full flex items-center justify-between p-4 transition-colors border-b border-gray-200 ${
                bankAccountsExpanded
                  ? 'bg-gradient-to-br from-[#005EB8] to-primary-500 text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${bankAccountsExpanded ? 'text-white' : 'text-gray-900'}`}>
                Bank accounts ({specificBankAccounts.length})
              </span>
              {bankAccountsExpanded ? (
                <ChevronDown className="w-5 h-5 text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {bankAccountsExpanded && (
              <div className="bg-white">
                {specificBankAccounts.map((account, index) => (
                  <Link
                    key={account.accountNumber}
                    to={`/account/${account.accountNumber}`}
                    className={`flex items-center justify-between p-4 pl-8 hover:bg-gray-50 transition-colors ${
                      index < specificBankAccounts.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-4">
                        {account.name} <span className="text-gray-500">(...{account.accountNumber})</span>
                      </p>
                      <p className="balance-display text-right">{formatCurrency(account.balance)}</p>
                      <p className="text-xs text-gray-500 text-right mt-1">Available balance</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <button
              onClick={() => setCreditCardsExpanded(!creditCardsExpanded)}
              className={`w-full flex items-center justify-between p-4 transition-colors border-b border-gray-200 ${
                creditCardsExpanded
                  ? 'bg-gradient-to-br from-[#005EB8] to-primary-500 text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${creditCardsExpanded ? 'text-white' : 'text-gray-900'}`}>
                Credit cards ({specificCreditCards.length})
              </span>
              {creditCardsExpanded ? (
                <ChevronDown className="w-5 h-5 text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {creditCardsExpanded && (
              <div className="bg-white border-b border-gray-200">
                {specificCreditCards.map((card, index) => (
                  <Link
                    key={card.accountNumber}
                    to={`/account/${card.accountNumber}`}
                    className={`block p-4 pl-8 hover:bg-gray-50 transition-colors ${
                      index < specificCreditCards.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-700 mb-3">
                        {card.name} <span className="text-gray-500">(...{card.accountNumber})</span>
                      </p>

                      <div className="flex items-center gap-4">
                        {card.accountNumber === '9933' && (
                          <img
                            src="/freedom_unlimited-removebg-preview_(1).png"
                            alt="Freedom Unlimited"
                            className="w-20 h-12 object-contain"
                          />
                        )}
                        {card.accountNumber === '2464' && (
                          <img
                            src="/chase_sapphire_reserve_06_24_25-removebg-preview_(1).png"
                            alt="Sapphire Reserve"
                            className="w-20 h-12 object-contain"
                          />
                        )}
                        {card.accountNumber === '2456' && (
                          <img
                            src="/chase-sapphire-preferred-lead.jpg"
                            alt="Sapphire Preferred"
                            className="w-20 h-12 object-contain"
                          />
                        )}

                        <div className="flex-1 text-right">
                          <p className="balance-display">{formatCurrency(Math.abs(card.balance))}</p>
                          <p className="text-xs text-gray-500 mt-1">Current balance</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/accounts"
              className="flex items-center justify-center p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">Link external accounts</span>
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
            className="block text-left py-3 px-6 border border-primary-600 text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors"
          >
            Explore products
          </Link>
        </div>

        {accountType === 'personal' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Grow your business with our analytics</h2>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    Process payments with Chase to see sales data and get actionable insights.
                  </p>
                  <button className="text-primary-600 font-medium px-5 py-2 border-2 border-primary-600 rounded-full hover:bg-primary-50 transition-colors">
                    See more
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Chase MyHome</h2>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    See rates, properties and insights, and manage your mortgage
                  </p>
                  <button className="text-primary-600 font-medium px-5 py-2 border-2 border-primary-600 rounded-full hover:bg-primary-50 transition-colors">
                    See details
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
                    <Home className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Earn up to $250 cash back per year</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    That's $25 cash back for each friend who gets a Freedom Rise® credit card.
                  </p>
                  <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Refer friends now
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="/freedom_unlimited-removebg-preview_(1).png"
                    alt="Freedom Card"
                    className="w-24 h-16 object-contain"
                  />
                </div>
              </div>
            </div>

            <Link to="/rewards" className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ultimate Rewards®</h2>
              <div className="flex gap-8 mb-6">
                <div className="flex-1">
                  <div className="text-4xl font-bold text-gray-900 mb-1">204,239</div>
                  <div className="text-sm text-gray-600">Available points</div>
                </div>
                <div className="border-l border-gray-200"></div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-gray-900 mb-1">41,492</div>
                  <div className="text-sm text-gray-600">Pending points</div>
                </div>
              </div>
              <span className="block text-center text-primary-600 font-medium px-5 py-2.5 border-2 border-primary-600 rounded-full hover:bg-primary-50 transition-colors w-full">
                Redeem rewards
              </span>
            </Link>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Chase Offers</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">99</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Cash back happens here<br />
                For Freedom Rise (...9933)
              </p>
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop"
                        alt="Bamboo Beach"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        New
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Bamboo Beach Tiki Bar & Cafe</h3>
                      <p className="text-sm font-semibold text-gray-900">5% cash back</p>
                    </div>
                    <button className="flex-shrink-0">
                      <Plus className="w-6 h-6 text-primary-600" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop"
                        alt="TaxAct"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        New
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">TaxAct</h3>
                      <p className="text-sm font-semibold text-gray-900">25% back</p>
                    </div>
                    <button className="flex-shrink-0">
                      <Plus className="w-6 h-6 text-primary-600" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop"
                        alt="Casa Calabria"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        New
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Casa Calabria</h3>
                      <p className="text-sm font-semibold text-gray-900">5% cash back</p>
                    </div>
                    <button className="flex-shrink-0">
                      <Plus className="w-6 h-6 text-primary-600" />
                    </button>
                  </div>
                </div>
              </div>
              <button className="bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors w-full">
                See all available deals
              </button>
            </div>

            <Link
              to="/credit-score"
              className="block bg-primary-600 rounded-xl shadow-sm p-6 text-white mb-4 hover:bg-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">See your free credit score</h2>
                  <p className="text-primary-50 mb-4">
                    Get credit and identity monitoring with Chase Credit Journey®.
                  </p>
                  <button className="bg-white text-primary-600 px-6 py-2.5 rounded-full font-medium hover:bg-primary-50 transition-colors">
                    Get for free
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="#e5e7eb"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="#22c55e"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(75 / 100) * 125.6} 125.6`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 px-6 pt-6 pb-4">Visit us</h2>
              <Link to="/atm-locator" className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-gray-700" />
                  <span className="text-gray-900">Find ATM & branch</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <Link to="/atm-locator" className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-gray-700" />
                  <span className="text-gray-900">Schedule a meeting</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
