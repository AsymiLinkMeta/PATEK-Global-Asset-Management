import { useState } from 'react';
import { Plus, ChevronRight, ChevronDown, X, User, AlertCircle, CreditCard, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function Dashboard() {
  const navigate = useNavigate();
  const { accounts, profile } = useData();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [bankAccountsExpanded, setBankAccountsExpanded] = useState(false);
  const [creditCardsExpanded, setCreditCardsExpanded] = useState(false);
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
          <ChaseLogoIcon />
          <Link to="/profile" className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </Link>
        </div>

        <div className="flex items-center justify-center mb-5">
          <div className="relative bg-gray-200 rounded-full p-0.5 flex">
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
              className={`relative z-10 px-7 py-2 rounded-full text-sm font-medium transition-colors ${
                accountType === 'business' ? 'bg-gray-600 text-white' : 'bg-gray-500 text-white'
              }`}
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
            <span className="text-sm font-medium text-[#005EB8]">Send | Zelle®</span>
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
            <button
              onClick={() => setBankAccountsExpanded(!bankAccountsExpanded)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                bankAccountsExpanded
                  ? 'bg-[#005EB8] text-white'
                  : ''
              }`}
            >
              <span className={`font-medium ${bankAccountsExpanded ? 'text-white' : 'text-gray-900'}`}>
                Bank accounts ({bankAccounts.length})
              </span>
              {bankAccountsExpanded ? (
                <ChevronDown className="w-5 h-5 text-white" />
              ) : null}
            </button>

            {bankAccountsExpanded && (
              <div>
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
              </div>
            )}

            <button
              onClick={() => setCreditCardsExpanded(!creditCardsExpanded)}
              className={`w-full flex items-center justify-between p-4 transition-colors border-t border-gray-200 ${
                creditCardsExpanded
                  ? 'bg-[#005EB8] text-white'
                  : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {!creditCardsExpanded && (
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                )}
                <span className={`font-medium ${creditCardsExpanded ? 'text-white' : 'text-gray-900'}`}>
                  Credit cards ({creditCards.length})
                </span>
              </div>
              {creditCardsExpanded ? (
                <ChevronDown className="w-5 h-5 text-white" />
              ) : null}
            </button>

            {creditCardsExpanded && (
              <div>
                {creditCards.map((card) => (
                  <Link
                    key={card.id}
                    to={`/account/${card.account_number}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm text-gray-800 mb-3">
                      {card.account_name.charAt(0) + card.account_name.slice(1).toLowerCase()} (...{card.account_number}) <span className="text-gray-400">&#9654;</span>
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src="/freedom_unlimited-removebg-preview_(1).png"
                        alt={card.account_name}
                        className="w-28 h-[70px] object-contain"
                      />
                      <div className="flex-1 text-right">
                        <p className="balance-display">{formatCurrency(card.balance)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Current balance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-3">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-teal-700">
                        You've scheduled {formatCurrency(card.balance)} to be paid on Feb 21, 2026.
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

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
            <ProductCard icon={<CreditCardIcon />} label="Credit cards" />
            <ProductCard icon={<CheckingIcon />} label="Checking" />
            <ProductCard icon={<SavingsIcon />} label="Savings & CDs" />
            <ProductCard icon={<AdvisorsIcon />} label="Work with our advisors" />
            <ProductCard icon={<BusinessIcon />} label="Business" />
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
          <h2 className="text-base font-semibold text-gray-900 mb-4">Ultimate Rewards®</h2>
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
              logo="https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=80&h=80&fit=crop"
              name="Cumberland Farms"
              subtitle="Pay-at-Pump"
              cashBack="5% cash back"
            />
            <OfferCard
              image="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
              logo="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=80&h=80&fit=crop"
              name="Lululemon"
              cashBack="10% back"
            />
            <OfferCard
              image="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
              logo="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop"
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
                Get credit and identity monitoring with Chase Credit Journey®.
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

function ChaseLogoIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 2L8 14h10V2z" fill="#005EB8" />
      <path d="M38 20L26 8v10h12z" fill="#005EB8" />
      <path d="M20 38l12-12H22v12z" fill="#005EB8" />
      <path d="M2 20l12 12V22H2z" fill="#005EB8" />
    </svg>
  );
}

function ProductCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex-shrink-0 w-[100px] bg-white rounded-xl border border-gray-200 p-3 flex flex-col items-center">
      <div className="w-12 h-12 flex items-center justify-center mb-2">
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-800 text-center leading-tight">{label}</p>
    </div>
  );
}

function CreditCardIcon() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
      <rect x="1" y="1" width="38" height="30" rx="4" fill="#005EB8" />
      <rect x="5" y="7" width="12" height="8" rx="1" fill="#f59e0b" />
      <rect x="1" y="14" width="38" height="4" fill="#003d7a" />
    </svg>
  );
}

function CheckingIcon() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
      <rect x="1" y="1" width="38" height="30" rx="4" fill="#0097a7" />
      <rect x="5" y="9" width="20" height="3" rx="1" fill="white" opacity="0.7" />
      <rect x="5" y="15" width="15" height="3" rx="1" fill="white" opacity="0.5" />
      <rect x="5" y="21" width="25" height="3" rx="1" fill="white" opacity="0.3" />
    </svg>
  );
}

function SavingsIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <ellipse cx="18" cy="24" rx="12" ry="6" fill="#f9a8d4" />
      <ellipse cx="18" cy="18" rx="10" ry="10" fill="#f472b6" />
      <circle cx="14" cy="16" r="1.5" fill="#be185d" />
      <ellipse cx="22" cy="12" rx="3" ry="5" fill="#f9a8d4" transform="rotate(-20 22 12)" />
      <circle cx="18" cy="8" r="2" fill="#fbbf24" />
    </svg>
  );
}

function AdvisorsIcon() {
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
      <circle cx="14" cy="12" r="5" fill="#0097a7" />
      <circle cx="26" cy="12" r="5" fill="#005EB8" />
      <ellipse cx="14" cy="30" rx="8" ry="6" fill="#0097a7" />
      <ellipse cx="26" cy="30" rx="8" ry="6" fill="#005EB8" />
      <rect x="10" y="28" width="20" height="4" fill="#4caf50" />
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
      <rect x="2" y="10" width="28" height="24" rx="2" fill="#005EB8" />
      <rect x="8" y="4" width="16" height="8" rx="2" fill="#003d7a" />
      <rect x="12" y="2" width="8" height="4" rx="1" fill="#005EB8" />
      <circle cx="16" cy="22" r="3" fill="#fbbf24" />
      <rect x="14" y="22" width="4" height="6" fill="#fbbf24" />
    </svg>
  );
}

interface OfferCardProps {
  image: string;
  logo: string;
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
