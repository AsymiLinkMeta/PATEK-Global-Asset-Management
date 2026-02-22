import { Link } from 'react-router-dom';
import { PieChart, TrendingUp, Target, Calendar, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const spendingCategories = [
  { name: 'Dining', amount: 703.92, color: 'bg-orange-500', pct: 28 },
  { name: 'Shopping', amount: 564.43, color: 'bg-blue-500', pct: 22 },
  { name: 'Groceries', amount: 489.19, color: 'bg-green-500', pct: 19 },
  { name: 'Travel', amount: 1227.00, color: 'bg-teal-500', pct: 18 },
  { name: 'Utilities', amount: 379.50, color: 'bg-yellow-500', pct: 8 },
  { name: 'Other', amount: 136.98, color: 'bg-gray-400', pct: 5 },
];

export default function PlanTrack() {
  const { accounts } = useData();

  const bankAccounts = accounts.filter(a => a.account_type === 'checking' || a.account_type === 'savings');
  const creditCards = accounts.filter(a => a.account_type === 'credit');
  const totalBankBalance = bankAccounts.reduce((s, a) => s + a.balance, 0);
  const totalCreditBalance = creditCards.reduce((s, a) => s + a.balance, 0);
  const netWorth = totalBankBalance - totalCreditBalance;
  const totalSpending = spendingCategories.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Plan & Track</h1>
        <p className="text-sm text-gray-500">Understand your money at a glance</p>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Snapshot</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-1">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-[11px] text-green-700 font-medium">Cash & savings</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(totalBankBalance)}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-1">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-[11px] text-red-600 font-medium">Credit balance</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(totalCreditBalance)}</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Net position</span>
              <span className="text-lg font-bold text-gray-900">{formatCurrency(netWorth)}</span>
            </div>
          </div>
        </div>

        <Link to="/spending-insights" className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#0060f0]" />
              <h2 className="text-base font-semibold text-gray-900">Spending this month</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-4">{formatCurrency(totalSpending)}</p>
          <div className="flex rounded-full overflow-hidden h-2 mb-4">
            {spendingCategories.map((cat) => (
              <div key={cat.name} className={`${cat.color}`} style={{ width: `${cat.pct}%` }} />
            ))}
          </div>
          <div className="space-y-2.5">
            {spendingCategories.slice(0, 4).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(cat.amount)}</span>
              </div>
            ))}
          </div>
        </Link>

        <Link to="/credit-score" className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                  <circle cx="28" cy="28" r="24" stroke="#22c55e" strokeWidth="4" fill="none" strokeDasharray={`${(0.82) * 150.8} 150.8`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">812</span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Credit Journey</p>
                <p className="text-xs text-green-600 font-medium">Excellent</p>
                <p className="text-[11px] text-gray-500">Updated Feb 15</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-[#0060f0]" />
            <h2 className="text-base font-semibold text-gray-900">Budget</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Dining', spent: 703, budget: 800, color: 'bg-orange-500' },
              { name: 'Shopping', spent: 564, budget: 750, color: 'bg-blue-500' },
              { name: 'Groceries', spent: 489, budget: 600, color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.min((item.spent / item.budget) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#0060f0]" />
            <h2 className="text-base font-semibold text-gray-900">Upcoming bills</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'FPL - Florida Power', amount: 189, days: 5 },
              { name: 'AT&T Internet', amount: 65, days: 8 },
              { name: 'Brickell Heights LLC', amount: 2100, days: 12 },
            ].map((bill) => (
              <div key={bill.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                  <p className="text-[11px] text-gray-500">Due in {bill.days} days</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(bill.amount)}</span>
              </div>
            ))}
          </div>
          <Link to="/pay-bills" className="block text-center text-[#0060f0] text-sm font-medium mt-3">See all bills</Link>
        </div>
      </div>
    </div>
  );
}
