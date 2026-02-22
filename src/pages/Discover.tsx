import { Link } from 'react-router-dom';
import { CreditCard, Wallet, PiggyBank, TrendingUp, Home, Gift, ChevronRight, Star, Percent, Briefcase } from 'lucide-react';

const productCategories = [
  { icon: CreditCard, label: 'Credit cards', desc: 'Cash back, travel, rewards', color: 'bg-[#0060f0]' },
  { icon: Wallet, label: 'Checking', desc: 'No monthly fees with conditions', color: 'bg-[#0060f0]' },
  { icon: PiggyBank, label: 'Savings & CDs', desc: 'Earn up to 4.00% APY', color: 'bg-emerald-600' },
  { icon: TrendingUp, label: 'Investing', desc: 'Self-directed & managed', color: 'bg-[#0060f0]' },
  { icon: Home, label: 'Home lending', desc: 'Mortgage & refinance', color: 'bg-[#0060f0]' },
  { icon: Briefcase, label: 'Business', desc: 'Banking & lending', color: 'bg-gray-700' },
];

const chaseOffers = [
  { merchant: 'Bamboo Beach Tiki Bar', cashBack: '5% cash back', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop', isNew: true },
  { merchant: 'TaxAct', cashBack: '25% back', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop', isNew: true },
  { merchant: 'Casa Calabria', cashBack: '5% cash back', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop', isNew: true },
];

export default function Discover() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Discover</h1>
        <p className="text-sm text-gray-500">Explore products, offers, and rewards</p>
      </div>

      <div className="px-6 py-5 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Explore products</h2>
          <div className="grid grid-cols-2 gap-3">
            {productCategories.map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-0.5">{label}</p>
                <p className="text-[11px] text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0060f0] to-[#004aad] rounded-xl p-5 text-white">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold">Ultimate Rewards</span>
              </div>
              <p className="text-2xl font-bold mb-1">204,239</p>
              <p className="text-blue-200 text-xs">Available points</p>
            </div>
            <Link to="/rewards" className="bg-white text-[#0060f0] px-4 py-2 rounded-full text-sm font-semibold">
              Redeem
            </Link>
          </div>
          <div className="flex items-center gap-2 text-blue-200 text-xs">
            <Gift className="w-4 h-4" />
            <span>41,492 points pending</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Chase Offers</h2>
              <p className="text-xs text-gray-500">Cash back on things you buy</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#0060f0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">99</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="space-y-3">
            {chaseOffers.map((offer) => (
              <div key={offer.merchant} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img src={offer.image} alt={offer.merchant} className="w-14 h-14 rounded-lg object-cover" />
                    {offer.isNew && (
                      <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">New</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{offer.merchant}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Percent className="w-3 h-3 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">{offer.cashBack}</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 bg-[#0060f0] text-white text-xs font-semibold px-4 py-2 rounded-full">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
