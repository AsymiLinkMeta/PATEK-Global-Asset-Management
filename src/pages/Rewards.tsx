import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Plane, DollarSign, Gift, ShoppingBag, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Rewards() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rewardsPoints, setRewardsPoints] = useState(48750);
  const [selectedTab, setSelectedTab] = useState<'earn' | 'redeem' | 'activity'>('earn');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRewards();
  }, [user]);

  const loadRewards = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('rewards_points')
      .eq('id', user.id)
      .maybeSingle();

    if (data?.rewards_points) setRewardsPoints(data.rewards_points);
    setLoading(false);
  };

  const formatPoints = (points: number) =>
    new Intl.NumberFormat('en-US').format(points);

  const cashValue = (rewardsPoints * 0.0125).toFixed(2);
  const travelValue = (rewardsPoints * 0.015).toFixed(2);

  const earnCategories = [
    { category: 'Travel', rate: '5x', description: 'Flights, hotels, car rentals booked through Chase', icon: Plane, color: 'bg-blue-50 text-blue-600' },
    { category: 'Dining', rate: '3x', description: 'Restaurants, takeout, eligible delivery services', icon: Star, color: 'bg-orange-50 text-orange-600' },
    { category: 'Online Shopping', rate: '3x', description: 'Select online retailers when you shop through Chase', icon: ShoppingBag, color: 'bg-green-50 text-green-600' },
    { category: 'Everything Else', rate: '1x', description: 'All other purchases earn 1 point per dollar', icon: DollarSign, color: 'bg-gray-100 text-gray-600' },
  ];

  const redeemOptions = [
    { title: 'Travel', subtitle: 'Worth 50% more through Chase', value: `$${travelValue}`, icon: Plane, highlight: true },
    { title: 'Cash Back', subtitle: 'Statement credit or direct deposit', value: `$${cashValue}`, icon: DollarSign, highlight: false },
    { title: 'Gift Cards', subtitle: 'Popular retailers and restaurants', value: `$${cashValue}`, icon: Gift, highlight: false },
    { title: 'Shop with Points', subtitle: 'Use points at Amazon and more', value: `$${cashValue}`, icon: ShoppingBag, highlight: false },
  ];

  const recentActivity = [
    { description: 'Delta Airlines purchase', points: 2445, type: 'earned', date: '2 days ago' },
    { description: 'Whole Foods Market', points: 156, type: 'earned', date: '3 days ago' },
    { description: 'Statement credit redemption', points: -5000, type: 'redeemed', date: '1 week ago' },
    { description: 'The Cheesecake Factory', points: 202, type: 'earned', date: '1 week ago' },
    { description: 'Amazon.com purchase', points: 270, type: 'earned', date: '2 weeks ago' },
    { description: 'Marriott Hotels', points: 937, type: 'earned', date: '2 weeks ago' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#005EB8] to-primary-700 px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold text-white">Ultimate Rewards</h1>
        </div>

        <div className="text-center mb-6">
          <p className="text-blue-200 text-sm mb-2">Available Points</p>
          <p className="text-5xl font-bold text-white mb-2">{formatPoints(rewardsPoints)}</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <p className="text-blue-200 text-xs">Cash Value</p>
              <p className="text-white font-semibold">${cashValue}</p>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <p className="text-blue-200 text-xs">Travel Value</p>
              <p className="text-white font-semibold">${travelValue}</p>
            </div>
          </div>
        </div>

        <div className="flex bg-white/10 rounded-full p-1">
          {(['earn', 'redeem', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors capitalize ${
                selectedTab === tab
                  ? 'bg-white text-primary-700'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {selectedTab === 'earn' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">How you earn points</h2>
            {earnCategories.map((cat) => (
              <div key={cat.category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.color.split(' ')[0]}`}>
                    <cat.icon className={`w-6 h-6 ${cat.color.split(' ')[1]}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{cat.category}</p>
                      <span className="text-lg font-bold text-primary-600">{cat.rate}</span>
                    </div>
                    <p className="text-sm text-gray-500">{cat.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">Bonus Categories This Quarter</p>
                  <p className="text-sm text-blue-700">Earn 5% on gas stations and select streaming services through March 2026.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'redeem' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Redemption options</h2>
            {redeemOptions.map((option) => (
              <button
                key={option.title}
                className={`w-full bg-white rounded-xl shadow-sm border p-4 text-left hover:shadow-md transition-shadow ${
                  option.highlight ? 'border-primary-300 ring-1 ring-primary-100' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    option.highlight ? 'bg-primary-50' : 'bg-gray-100'
                  }`}>
                    <option.icon className={`w-6 h-6 ${option.highlight ? 'text-primary-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">{option.title}</p>
                      {option.highlight && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">Best Value</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{option.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{option.value}</p>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedTab === 'activity' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent points activity</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-gray-900">{item.description}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <p className={`font-semibold ${item.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.points > 0 ? '+' : ''}{formatPoints(item.points)} pts
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
