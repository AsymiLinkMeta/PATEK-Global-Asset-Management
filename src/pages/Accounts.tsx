import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                      <p className="balance-display">{formatCurrency(Number(account.balance))}</p>
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
                        className="w-16 h-16 object-contain rounded-lg"
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
      </div>
    </div>
  );
}
