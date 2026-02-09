import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, TrendingDown, TrendingUp, ShoppingBag, Utensils, Car, Zap, Film, Heart, Home as HomeIcon, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategorySpending {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

interface TopMerchant {
  merchant: string;
  amount: number;
  count: number;
}

const categoryConfig: Record<string, { icon: typeof ShoppingBag; color: string; bg: string }> = {
  shopping: { icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
  dining: { icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
  transport: { icon: Car, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  utilities: { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  entertainment: { icon: Film, color: 'text-pink-600', bg: 'bg-pink-50' },
  health: { icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
  housing: { icon: HomeIcon, color: 'text-green-600', bg: 'bg-green-50' },
  groceries: { icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
};

const categoryBarColors: Record<string, string> = {
  shopping: 'bg-blue-500',
  dining: 'bg-orange-500',
  transport: 'bg-cyan-500',
  utilities: 'bg-yellow-500',
  entertainment: 'bg-pink-500',
  health: 'bg-red-500',
  housing: 'bg-green-500',
  groceries: 'bg-emerald-500',
};

export default function SpendingInsights() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategorySpending[]>([]);
  const [topMerchants, setTopMerchants] = useState<TopMerchant[]>([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    loadInsights();
  }, [user, period]);

  const loadInsights = async () => {
    if (!user) return;
    setLoading(true);

    const { data: accountsData } = await supabase
      .from('accounts')
      .select('id')
      .eq('user_id', user.id);

    if (!accountsData || accountsData.length === 0) {
      setLoading(false);
      return;
    }

    const accountIds = accountsData.map(a => a.id);

    const now = new Date();
    let startDate: Date;
    if (period === 'week') {
      startDate = new Date(now.getTime() - 7 * 86400000);
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .in('account_id', accountIds)
      .gte('transaction_date', startDate.toISOString())
      .order('transaction_date', { ascending: false });

    if (!transactions) {
      setLoading(false);
      return;
    }

    const debits = transactions.filter(t => t.transaction_type === 'debit');
    const credits = transactions.filter(t => t.transaction_type === 'credit');

    const spending = debits.reduce((sum, t) => sum + t.amount, 0);
    const income = credits.reduce((sum, t) => sum + t.amount, 0);
    setTotalSpending(spending);
    setTotalIncome(income);

    const catMap: Record<string, { amount: number; count: number }> = {};
    debits.forEach(t => {
      if (!catMap[t.category]) catMap[t.category] = { amount: 0, count: 0 };
      catMap[t.category].amount += t.amount;
      catMap[t.category].count += 1;
    });

    const catArray = Object.entries(catMap)
      .map(([category, data]) => ({
        category,
        amount: data.amount,
        count: data.count,
        percentage: spending > 0 ? (data.amount / spending) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    setCategories(catArray);

    const merchantMap: Record<string, { amount: number; count: number }> = {};
    debits.forEach(t => {
      if (!merchantMap[t.merchant]) merchantMap[t.merchant] = { amount: 0, count: 0 };
      merchantMap[t.merchant].amount += t.amount;
      merchantMap[t.merchant].count += 1;
    });

    const merchantArray = Object.entries(merchantMap)
      .map(([merchant, data]) => ({ merchant, ...data }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    setTopMerchants(merchantArray);
    setLoading(false);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

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
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Spending Insights</h1>
        </div>

        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              This {p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600 font-medium">Spent</span>
            </div>
            <p className="text-xl font-bold text-red-700">{formatCurrency(totalSpending)}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Income</span>
            </div>
            <p className="text-xl font-bold text-green-700">{formatCurrency(totalIncome)}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending by category</h2>
          {categories.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No spending data for this period</p>
            </div>
          ) : (
            <div className="space-y-3">
              {categories.map((cat) => {
                const config = categoryConfig[cat.category] || { icon: ShoppingBag, color: 'text-gray-600', bg: 'bg-gray-50' };
                const barColor = categoryBarColors[cat.category] || 'bg-gray-400';
                const IconComponent = config.icon;

                return (
                  <div key={cat.category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${config.bg} rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 capitalize">{cat.category}</p>
                          <p className="font-semibold text-gray-900">{formatCurrency(cat.amount)}</p>
                        </div>
                        <p className="text-xs text-gray-500">{cat.count} transaction{cat.count !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${barColor} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">{cat.percentage.toFixed(1)}%</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {topMerchants.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top merchants</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
              {topMerchants.map((merchant, index) => (
                <div key={merchant.merchant} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{merchant.merchant}</p>
                      <p className="text-xs text-gray-500">{merchant.count} transaction{merchant.count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{formatCurrency(merchant.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
