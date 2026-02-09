import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CreditCard, ChevronRight, Plus, TrendingUp, Home, Calendar, Award, Tag, CreditCard as CreditScoreIcon } from 'lucide-react';

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  account_name: string;
  balance: number;
  currency: string;
  status: string;
}

interface Card {
  id: string;
  card_number: string;
  card_type: string;
  card_network: string;
  expiry_date: string;
  status: string;
}

export default function Accounts() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    const { data: accountsData } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (accountsData) {
      setAccounts(accountsData);

      if (accountsData.length > 0) {
        const { data: cardsData } = await supabase
          .from('cards')
          .select('*')
          .eq('account_id', accountsData[0].id);

        if (cardsData) setCards(cardsData);
      }
    }

    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getAccountIcon = (type: string) => {
    return <CreditCard className="w-6 h-6" />;
  };

  const getAccountColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'bg-primary-600';
      case 'savings':
        return 'bg-green-500';
      case 'credit':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
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
        <h1 className="text-2xl font-semibold text-gray-900">Accounts & Cards</h1>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Accounts</h2>
          {accounts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500 mb-4">No accounts found</p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Account
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map((account) => (
                <Link
                  key={account.id}
                  to={`/account/${account.id}`}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{account.account_name}</p>
                      <p className="text-sm text-gray-500">
                        <span className="capitalize">{account.account_type}</span> •••• {account.account_number.slice(-4)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="balance-display text-right">{formatCurrency(Number(account.balance))}</p>
                      <ChevronRight className="w-5 h-5 text-gray-400 ml-auto mt-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {cards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Cards</h2>
            <div className="space-y-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

                  <div className="relative z-10 flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src="/freedom_unlimited-removebg-preview_(1).png"
                        alt="Card"
                        className="w-8 h-8 object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-12">
                        <div></div>
                        <div className="text-sm font-medium uppercase tracking-wider opacity-90">{card.card_network}</div>
                      </div>
                      <div className="mb-6">
                        <div className="text-2xl tracking-widest font-mono">
                          •••• •••• •••• {card.card_number}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs text-white/60 mb-1">VALID THRU</div>
                          <div className="text-sm font-medium">{card.expiry_date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white/60 mb-1">TYPE</div>
                          <div className="text-sm font-medium capitalize">{card.card_type}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ultimate Rewards®</h2>
          <div className="flex gap-8 mb-6">
            <div className="flex-1">
              <div className="text-4xl font-bold text-gray-900 mb-1">2,425</div>
              <div className="text-sm text-gray-600">Available points</div>
            </div>
            <div className="border-l border-gray-200"></div>
            <div className="flex-1">
              <div className="text-4xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-600">Pending points</div>
            </div>
          </div>
          <button className="text-primary-600 font-medium px-5 py-2.5 border-2 border-primary-600 rounded-full hover:bg-primary-50 transition-colors w-full">
            Redeem rewards
          </button>
        </div>

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

        <div className="bg-primary-600 rounded-xl shadow-sm p-6 text-white mb-4">
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 px-6 pt-6 pb-4">Visit us</h2>
          <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-200">
            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6 text-gray-700" />
              <span className="text-gray-900">Schedule a meeting</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
