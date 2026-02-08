import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CreditCard, ChevronRight, Plus } from 'lucide-react';

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
        return 'bg-blue-500';
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
      <div className="bg-primary-500 text-white px-6 pt-12 pb-8">
        <h1 className="text-2xl font-bold">My Accounts</h1>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Bank Accounts</h2>
          {accounts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-500 mb-4">No accounts found</p>
              <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Account
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${getAccountColor(account.account_type)} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                        {getAccountIcon(account.account_type)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{account.account_name}</p>
                        <p className="text-sm text-gray-500">••••{account.account_number.slice(-4)}</p>
                        <p className="text-xs text-gray-400 capitalize mt-1">{account.account_type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(Number(account.balance))}</p>
                      <ChevronRight className="w-5 h-5 text-gray-400 ml-auto mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">My Cards</h2>
            <div className="space-y-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg p-6 text-white"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-sm opacity-90 uppercase">{card.card_network}</div>
                    <div className="text-sm capitalize">{card.card_type}</div>
                  </div>
                  <div className="mb-6">
                    <div className="text-xl tracking-wider font-mono">
                      •••• •••• •••• {card.card_number}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs opacity-75 mb-1">Expires</div>
                      <div className="font-medium">{card.expiry_date}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      card.status === 'active' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {card.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
