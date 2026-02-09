import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, User, CreditCard, Plus, Wallet, Receipt, TrendingUp, Star, Menu } from 'lucide-react';

interface OfferCard {
  id: string;
  business: string;
  cashback: string;
  image: string;
  isNew: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [accountType] = useState<'personal' | 'business'>('personal');

  const offers: OfferCard[] = [
    {
      id: '1',
      business: 'Bamboo Beach Tiki Bar & Cafe',
      cashback: '5% cash back',
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=300&h=200&fit=crop',
      isNew: true,
    },
    {
      id: '2',
      business: 'TaxAct',
      cashback: '25% back',
      image: 'https://images.unsplash.com/photo-1554224311-beee460c201a?w=300&h=200&fit=crop',
      isNew: true,
    },
    {
      id: '3',
      business: 'Casa Calabria',
      cashback: '5% cash back',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <Link to="/accounts" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <CreditCard className="w-6 h-6 text-gray-700" />
            <Plus className="w-3 h-3 text-gray-700 absolute top-1 right-1 bg-white rounded-full" />
          </Link>
          <div className="flex items-center justify-center flex-1">
            <div className="relative bg-gray-200 rounded-full p-1">
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gray-600 rounded-full transition-all duration-300 ease-in-out shadow-md ${
                  accountType === 'personal' ? 'left-1' : 'left-[calc(50%+2px)]'
                }`}
              />
              <button
                className={`relative z-10 px-8 py-2 rounded-full transition-colors text-sm ${
                  accountType === 'personal'
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => navigate('/business')}
                className={`relative z-10 px-8 py-2 rounded-full transition-colors text-sm ${
                  accountType === 'business'
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              >
                Business
              </button>
            </div>
          </div>
          <Link to="/profile" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </Link>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ultimate Rewards®</h2>
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <p className="text-4xl font-bold text-gray-900 mb-1">2,425</p>
              <p className="text-base text-gray-600">Available points</p>
            </div>
            <div className="w-px h-16 bg-gray-300 mx-4"></div>
            <div className="flex-1">
              <p className="text-4xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-base text-gray-600">Pending points</p>
            </div>
          </div>
          <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Redeem rewards
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Chase Offers</h2>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[28px] text-center">
                99
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="text-gray-700 text-base mb-1">Cash back happens here</p>
          <p className="text-gray-500 text-sm mb-4">For Freedom Rise (...9933)</p>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-6 px-6 mb-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex-shrink-0 w-56 bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="relative h-32">
                  <img
                    src={offer.image}
                    alt={offer.business}
                    className="w-full h-full object-cover"
                  />
                  {offer.isNew && (
                    <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded">
                      New
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">{offer.business}</p>
                  <p className="text-sm font-bold text-gray-900 mb-3">{offer.cashback}</p>
                  <button className="w-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600 border-2 border-blue-600 rounded-full p-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
            See all available deals
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
          <h2 className="text-xl font-bold mb-4">See your free credit score</h2>
          <div className="flex items-center justify-between mb-6">
            <p className="text-base leading-relaxed flex-1">
              Get credit and identity monitoring with Chase Credit Journey®.
            </p>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-4 flex-shrink-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-yellow-400 border-r-green-500"></div>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Get started
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Link to="/accounts" className="flex flex-col items-center gap-1">
            <Wallet className="w-6 h-6 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Accounts</span>
          </Link>
          <Link to="/transfer" className="flex flex-col items-center gap-1">
            <Receipt className="w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-500">Pay & transfer</span>
          </Link>
          <Link to="/transactions" className="flex flex-col items-center gap-1">
            <TrendingUp className="w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-500">Plan & track</span>
          </Link>
          <button className="flex flex-col items-center gap-1">
            <Star className="w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-500">Benefits & travel</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Menu className="w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-500">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
