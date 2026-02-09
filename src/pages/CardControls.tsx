import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Lock, Unlock, CreditCard, Eye, EyeOff, Plane, Bell, Shield, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Card {
  id: string;
  card_number: string;
  card_type: string;
  card_network: string;
  expiry_date: string;
  status: string;
  is_locked: boolean;
  account_id: string;
}

interface Account {
  id: string;
  account_name: string;
  account_number: string;
  balance: number;
  credit_limit: number;
}

export default function CardControls() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cardId } = useParams<{ cardId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [travelNotice, setTravelNotice] = useState(false);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    const { data: accountsData } = await supabase
      .from('accounts')
      .select('id, account_name, account_number, balance, credit_limit')
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (accountsData) setAccounts(accountsData);

    const accountIds = accountsData?.map(a => a.id) || [];
    if (accountIds.length === 0) {
      setLoading(false);
      return;
    }

    const { data: cardsData } = await supabase
      .from('cards')
      .select('*')
      .in('account_id', accountIds)
      .eq('status', 'active');

    if (cardsData) {
      setCards(cardsData);
      if (cardId) {
        const card = cardsData.find(c => c.id === cardId);
        if (card) setSelectedCard(card);
      }
    }

    setLoading(false);
  };

  const toggleLock = async (card: Card) => {
    setToggling(true);
    const newLockState = !card.is_locked;

    await supabase
      .from('cards')
      .update({ is_locked: newLockState })
      .eq('id', card.id);

    setCards(prev => prev.map(c => c.id === card.id ? { ...c, is_locked: newLockState } : c));
    if (selectedCard?.id === card.id) {
      setSelectedCard({ ...card, is_locked: newLockState });
    }
    setToggling(false);
  };

  const getAccountForCard = (accountId: string) =>
    accounts.find(a => a.id === accountId);

  const getCardImage = (accountName: string | undefined) => {
    if (!accountName) return null;
    if (accountName.includes('FREEDOM')) return '/freedom_unlimited-removebg-preview_(1).png';
    if (accountName.includes('PREFERRED')) return '/chase-sapphire-preferred-lead.jpg';
    if (accountName.includes('RESERVE')) return '/chase_sapphire_reserve_06_24_25-removebg-preview_(1).png';
    return null;
  };

  const formatExpiry = (date: string) => {
    const d = new Date(date);
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (selectedCard) {
    const account = getAccountForCard(selectedCard.account_id);
    const cardImage = getCardImage(account?.account_name);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setSelectedCard(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Card Details</h1>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-gray-300">{account?.account_name}</p>
                {cardImage && <img src={cardImage} alt="" className="h-8 object-contain" />}
              </div>

              <div className="mb-6">
                <p className="text-lg tracking-[0.25em] font-mono">
                  {showCardNumber
                    ? `**** **** **** ${selectedCard.card_number}`
                    : `**** **** **** ${selectedCard.card_number}`}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">EXPIRES</p>
                  <p className="font-mono">{formatExpiry(selectedCard.expiry_date)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">CVV</p>
                  <p className="font-mono">{showCardNumber ? '***' : '***'}</p>
                </div>
                <p className="text-sm uppercase font-medium">{selectedCard.card_network}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <button
            onClick={() => toggleLock(selectedCard)}
            disabled={toggling}
            className={`w-full flex items-center justify-between p-4 rounded-xl border ${
              selectedCard.is_locked
                ? 'bg-red-50 border-red-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {selectedCard.is_locked ? (
                <Lock className="w-6 h-6 text-red-600" />
              ) : (
                <Unlock className="w-6 h-6 text-green-600" />
              )}
              <div className="text-left">
                <p className="font-medium text-gray-900">
                  {selectedCard.is_locked ? 'Card is locked' : 'Card is active'}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedCard.is_locked ? 'Tap to unlock and resume transactions' : 'Tap to temporarily lock this card'}
                </p>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full relative transition-colors ${
              selectedCard.is_locked ? 'bg-red-500' : 'bg-green-500'
            }`}>
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                selectedCard.is_locked ? 'left-0.5' : 'left-5'
              }`} />
            </div>
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Transaction alerts</span>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-colors cursor-pointer ${
                transactionAlerts ? 'bg-green-500' : 'bg-gray-300'
              }`} onClick={() => setTransactionAlerts(!transactionAlerts)}>
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  transactionAlerts ? 'left-5' : 'left-0.5'
                }`} />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Plane className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Travel notification</span>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-colors cursor-pointer ${
                travelNotice ? 'bg-green-500' : 'bg-gray-300'
              }`} onClick={() => setTravelNotice(!travelNotice)}>
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  travelNotice ? 'left-5' : 'left-0.5'
                }`} />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Fraud protection</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {account && account.credit_limit > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Credit details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Credit limit</span>
                  <span className="font-medium">${account.credit_limit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current balance</span>
                  <span className="font-medium">${account.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available credit</span>
                  <span className="font-medium text-green-600">
                    ${(account.credit_limit - account.balance).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Card Controls</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {cards.length === 0 ? (
          <div className="text-center py-16">
            <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No active cards found</p>
          </div>
        ) : (
          cards.map((card) => {
            const account = getAccountForCard(card.account_id);
            const cardImage = getCardImage(account?.account_name);

            return (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {cardImage ? (
                      <img src={cardImage} alt="" className="w-14 h-8 object-contain" />
                    ) : (
                      <CreditCard className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{account?.account_name || 'Card'}</p>
                    <p className="text-sm text-gray-500">
                      {card.card_network.toUpperCase()} **** {card.card_number}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.is_locked && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        Locked
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
