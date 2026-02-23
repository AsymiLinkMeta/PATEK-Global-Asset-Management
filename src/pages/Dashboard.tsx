import { useState } from 'react';
import { Plus, ChevronRight, X, User, AlertCircle, CreditCard, CheckCircle2, MoreHorizontal, PiggyBank, Users, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const getCardImage = (name: string) => {
  if (name.includes('FREEDOM')) return '/freedom_unlimited-removebg-preview_(1).png';
  if (name.includes('PREFERRED')) return '/chase-sapphire-preferred-lead-removebg-preview_(1).png';
  if (name.includes('RESERVE')) return '/chase_sapphire_reserve_06_24_25-removebg-preview_(1).png';
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { accounts, profile } = useData();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [showCardAlert, setShowCardAlert] = useState(true);

  const bankAccounts = accounts.filter(a => a.account_type === 'checking' || a.account_type === 'savings');
  const creditCards = accounts.filter(a => a.account_type === 'credit');

  return (
    <div className="min-h-screen bg-[#f5f6f7]">
      <div className="bg-white px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-5">
          <button className="p-1.5">
            <div className="relative">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <div className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                <Plus className="w-2.5 h-2.5 text-gray-600" strokeWidth={3} />
              </div>
            </div>
          </button>
          <img src="/chase-bank.jpg" alt="Chase" className="h-12 w-12 rounded-lg" />
          <Link to="/profile" className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </Link>
        </div>

        <div className="flex items-center justify-center mb-5">
          <div className="relative bg-gray-200 rounded-full p-1">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full transition-all duration-300 ease-in-out shadow-sm ${
                accountType === 'personal' ? 'left-1' : 'left-[calc(50%+2px)]'
              }`}
            />
            <button
              onClick={() => setAccountType('personal')}
              className={`relative z-10 px-7 py-2 rounded-full text-sm font-medium transition-colors ${
                accountType === 'personal' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => navigate('/business')}
              className="relative z-10 px-7 py-2 rounded-full text-sm font-medium transition-colors text-gray-500"
            >
              Business
            </button>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1.5 -mx-5 px-5">
          <Link
            to="/accounts"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full"
          >
            <Plus className="w-5 h-5 text-[#005EB8]" />
          </Link>
          <Link
            to="/zelle"
            className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full whitespace-nowrap"
          >
            <span className="text-sm font-medium text-[#005EB8]">Send | Zelle&reg;</span>
          </Link>
          <Link
            to="/deposit-check"
            className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full whitespace-nowrap"
          >
            <span className="text-sm font-medium text-[#005EB8]">Deposit checks</span>
          </Link>
          <Link
            to="/pay-bills"
            className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full whitespace-nowrap"
          >
            <span className="text-sm font-medium text-[#005EB8]">Pay bills</span>
          </Link>
        </div>
      </div>

      <div className="px-5 pt-5 pb-6">
        {showCardAlert && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5 relative">
            <button
              onClick={() => setShowCardAlert(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-3 mb-3">
              <div className="mt-0.5">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1L1 18h18L10 1z" stroke="#005EB8" strokeWidth="1.5" fill="none" />
                  <circle cx="10" cy="14" r="0.8" fill="#005EB8" />
                  <line x1="10" y1="7" x2="10" y2="12" stroke="#005EB8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 pr-6">
                <h3 className="font-semibold text-gray-900 text-base mb-1.5">New card on the way</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your credit card ending in (...9933) is ready to use when it arrives.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-5 py-2 border-2 border-[#b8860b] text-[#b8860b] rounded-full text-sm font-semibold hover:bg-amber-50 transition-colors">
                Track my card
              </button>
            </div>
          </div>
        )}

        <Link
          to="/spending-insights"
          className="block bg-white rounded-xl border border-gray-200 p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/freedom_unlimited-removebg-preview_(1).png"
                  alt="Card"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-gray-900">Snapshot</span>
                  <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">1 min read</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your card usage is <span className="font-bold text-gray-900">$12</span> this week.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-900">Accounts</h2>
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-[#005EB8] px-4 py-3">
              <span className="font-medium text-white">
                Bank accounts ({bankAccounts.length})
              </span>
            </div>

            {bankAccounts.map((account, index) => (
              <Link
                key={account.id}
                to={`/account/${account.account_number}`}
                className={`block p-4 hover:bg-gray-50 transition-colors ${
                  index < bankAccounts.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <p className="text-sm text-gray-800 mb-3">
                  {account.account_name} (...{account.account_number}) <span className="text-gray-400">&#9654;</span>
                </p>
                <div className="text-right">
                  <p className="balance-display">{formatCurrency(account.balance)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Available balance</p>
                </div>
              </Link>
            ))}

            <div className="border-t border-gray-200">
              <div className="bg-[#005EB8] px-4 py-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-300" />
                  <span className="font-medium text-white">
                    Credit cards ({creditCards.length})
                  </span>
                </div>
              </div>

              {creditCards.map((card) => {
                const cardImg = getCardImage(card.account_name);
                return (
                  <Link
                    key={card.id}
                    to={`/account/${card.account_number}`}
                    className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <p className="text-sm text-gray-800 mb-3">
                      {card.account_name.charAt(0) + card.account_name.slice(1).toLowerCase()} (...{card.account_number}) <span className="text-gray-400">&#9654;</span>
                    </p>
                    <div className="flex items-center gap-4">
                      {cardImg && (
                        <img
                          src={cardImg}
                          alt={card.account_name}
                          className="w-28 h-[70px] object-contain"
                        />
                      )}
                      <div className="flex-1 text-right">
                        <p className="balance-display">{formatCurrency(card.balance)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Current balance</p>
                      </div>
                    </div>
                    {card.payment_due_date && (
                      <div className="flex items-start gap-2 mt-3">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-teal-700">
                          You've scheduled {formatCurrency(card.minimum_payment)} to be paid on {new Date(card.payment_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
                        </p>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            <Link
              to="/accounts"
              className="flex items-center justify-between p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900 font-medium">Link external accounts</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore more products</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 -mx-5 px-5">
            <ProductCard icon={<CreditCard className="w-6 h-6 text-[#005EB8]" />} label="Credit cards" />
            <ProductCard icon={<CreditCard className="w-6 h-6 text-[#0097a7]" />} label="Checking" />
            <ProductCard icon={<PiggyBank className="w-6 h-6 text-[#005EB8]" />} label="Savings & CDs" />
            <ProductCard icon={<Users className="w-6 h-6 text-[#005EB8]" />} label="Work with our advisors" />
            <ProductCard icon={<Briefcase className="w-6 h-6 text-[#005EB8]" />} label="Business" />
          </div>
          <div className="flex justify-center mt-3">
            <Link
              to="/discover"
              className="px-6 py-2.5 border-2 border-[#1a3c5e] text-[#1a3c5e] rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore products
            </Link>
          </div>
        </div>

        <Link to="/rewards" className="block bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Ultimate Rewards&reg;</h2>
          <div className="flex mb-5">
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900 mb-0.5">
                {new Intl.NumberFormat('en-US').format(profile.rewards_points)}
              </p>
              <p className="text-sm text-gray-500">Available points</p>
            </div>
            <div className="w-px bg-gray-200 mx-4"></div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900 mb-0.5">0</p>
              <p className="text-sm text-gray-500">Pending points</p>
            </div>
          </div>
          <div className="flex justify-end">
            <span className="px-5 py-2 border-2 border-[#1a3c5e] text-[#1a3c5e] rounded-full text-sm font-semibold">
              Redeem rewards
            </span>
          </div>
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-gray-900">Chase Offers</h2>
            <div className="flex items-center gap-2">
              <span className="bg-teal-700 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">116</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Cash back happens here</p>
          <p className="text-sm text-gray-600 mb-4">For Freedom Unlimited (...9933)</p>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 -mx-5 px-5">
            <OfferCard
              image="https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=400&h=300&fit=crop"
              name="Cumberland Farms"
              subtitle="Pay-at-Pump"
              cashBack="5% cash back"
            />
            <OfferCard
              image="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
              name="Lululemon"
              cashBack="10% back"
            />
            <OfferCard
              image="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
              name="Little Caesars"
              cashBack="10% cash back"
            />
          </div>

          <div className="flex justify-center mt-2">
            <button className="px-5 py-2.5 border-2 border-[#1a3c5e] text-[#1a3c5e] rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
              See all available deals
            </button>
          </div>
        </div>

        <Link
          to="/credit-score"
          className="block bg-[#005EB8] rounded-xl p-5 mb-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-2">See your free credit score</h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Get credit and identity monitoring with Chase Credit Journey&reg;.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="40%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 6 26 A 14 14 0 0 1 30 26"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 6 26 A 14 14 0 0 1 30 26"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="44"
                    strokeDashoffset="8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function ProductCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex-shrink-0 w-[100px] bg-white rounded-xl border border-gray-200 p-3 flex flex-col items-center">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-800 text-center leading-tight">{label}</p>
    </div>
  );
}

interface OfferCardProps {
  image: string;
  name: string;
  subtitle?: string;
  cashBack: string;
}

function OfferCard({ image, name, subtitle, cashBack }: OfferCardProps) {
  return (
    <div className="flex-shrink-0 w-[160px] bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="relative h-24">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-2 right-2 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          New
        </span>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-900 leading-tight">{name}</p>
        {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
        <p className="text-sm font-bold text-gray-900 mt-1">{cashBack}</p>
        <div className="flex justify-end mt-2">
          <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
