import { Link } from 'react-router-dom';
import { ChevronRight, Star, Plane, Shield, CreditCard, Gift, MapPin } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Benefits() {
  const { profile } = useData();

  return (
    <div className="min-h-screen bg-[#f5f6f7]">
      <div className="bg-white px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Benefits & travel</h1>
        <p className="text-sm text-gray-500">Your rewards, perks, and travel tools</p>
      </div>

      <div className="px-5 py-5 space-y-5">
        <Link to="/rewards" className="block bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-[#005EB8]" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">Ultimate Rewards®</h2>
              <p className="text-xs text-gray-500">
                {new Intl.NumberFormat('en-US').format(profile.rewards_points)} points available
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-gray-900">
                {new Intl.NumberFormat('en-US').format(profile.rewards_points)}
              </p>
              <p className="text-[11px] text-gray-500">Available</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-gray-900">0</p>
              <p className="text-[11px] text-gray-500">Pending</p>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <h2 className="font-semibold text-gray-900 px-5 pt-5 pb-3">Your benefits</h2>
          {[
            { icon: Plane, label: 'Travel benefits', desc: 'Trip insurance, delays, and more', route: '/rewards' },
            { icon: Shield, label: 'Purchase protection', desc: 'Extended warranty, purchase protection', route: '/rewards' },
            { icon: CreditCard, label: 'Card benefits', desc: 'Cell phone protection, rental car', route: '/rewards' },
            { icon: Gift, label: 'Chase Offers', desc: '116 offers available', route: '/dashboard' },
          ].map((item, i, arr) => (
            <Link
              key={item.label}
              to={item.route}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4.5 h-4.5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <h2 className="font-semibold text-gray-900 px-5 pt-5 pb-3">Travel tools</h2>
          {[
            { icon: MapPin, label: 'Airport lounge access', desc: 'Priority Pass & Chase lounges' },
            { icon: Plane, label: 'Travel notifications', desc: 'Let us know before you go' },
            { icon: MapPin, label: 'ATM & branch locator', desc: 'Find locations near you' },
          ].map((item, i, arr) => (
            <Link
              key={item.label}
              to="/atm-locator"
              className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4.5 h-4.5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
