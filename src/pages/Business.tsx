import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, User, CreditCard, Plus, PiggyBank, Users, Briefcase, Send } from 'lucide-react';

interface BusinessAccount {
  name: string;
  accountNumber: string;
  balance: number;
}

export default function Business() {
  const navigate = useNavigate();
  const [expandedPatek, setExpandedPatek] = useState(false);
  const [expandedAssymilink, setExpandedAssymilink] = useState(false);
  const [accountType, setAccountType] = useState<'personal' | 'business'>('business');

  const patekAccounts = [
    { name: 'BUS COMPLETE CHK', accountNumber: '8335', balance: 2872031.91 },
    { name: 'BUS PLATNIUM CHK', accountNumber: '2176', balance: 16621074.38 }
  ];

  const assymilinkAccounts = [
    { name: 'BUS COMPLETE CHK', accountNumber: '3989', balance: 1736529.82 },
    { name: 'BUS PLATNIUM CHK', accountNumber: '1557', balance: 6968012.82 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Link to="/accounts" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <CreditCard className="w-6 h-6 text-gray-700" />
            <Plus className="w-3 h-3 text-gray-700 absolute top-1 right-1 bg-white rounded-full" />
          </Link>
          <img src="/chase-bank.jpg" alt="Patek Global" className="h-12 w-12 rounded-lg" />
          <Link to="/profile" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </Link>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative bg-gray-200 rounded-full p-1">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full transition-all duration-300 ease-in-out shadow-sm ${
                accountType === 'personal' ? 'left-1' : 'left-[calc(50%+2px)]'
              }`}
            />
            <button
              onClick={() => navigate('/dashboard')}
              className={`relative z-10 px-8 py-2 rounded-full transition-colors ${
                accountType === 'personal'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setAccountType('business')}
              className={`relative z-10 px-8 py-2 rounded-full transition-colors ${
                accountType === 'business'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              Business
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
          <Link
            to="/accounts"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-5 h-5 text-primary-600" />
          </Link>
          <Link
            to="/transfer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Send className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-600">Wire transfer</span>
          </Link>
          <Link
            to="/accounts"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium text-primary-600">Deposit checks</span>
          </Link>
          <Link
            to="/transactions"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium text-primary-600">Pay vendors</span>
          </Link>
        </div>
      </div>

      <div className="px-6 py-6">
        <Link
          to="/transactions"
          className="block bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Snapshot</p>
                <p className="text-sm text-gray-600">
                  Your money in this month is {formatCurrency(411947.03)}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900">PATEK GLOBAL ASSET MANAGEMENT LLC.</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <span className="text-gray-600">•••</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <button
              onClick={() => setExpandedPatek(!expandedPatek)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                expandedPatek
                  ? 'bg-[#005EB8] text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${expandedPatek ? 'text-white' : 'text-gray-900'}`}>
                Bank accounts ({patekAccounts.length})
              </span>
              {expandedPatek ? (
                <ChevronDown className="w-5 h-5 text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedPatek && (
              <div className="bg-white border-t border-gray-200">
                {patekAccounts.map((account, index) => (
                  <Link
                    key={account.accountNumber}
                    to={`/account/${account.accountNumber}`}
                    className={`flex items-center justify-between p-4 pl-8 hover:bg-gray-50 transition-colors ${
                      index < patekAccounts.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-4">
                        {account.name} <span className="text-gray-500">(...{account.accountNumber})</span>
                      </p>
                      <p className="balance-display text-right">{formatCurrency(account.balance)}</p>
                      <p className="text-xs text-gray-500 text-right mt-1">Available balance</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900">ASSYMILINK META LLLP</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <span className="text-gray-600">•••</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
            <button
              onClick={() => setExpandedAssymilink(!expandedAssymilink)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                expandedAssymilink
                  ? 'bg-[#005EB8] text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${expandedAssymilink ? 'text-white' : 'text-gray-900'}`}>
                Bank accounts ({assymilinkAccounts.length})
              </span>
              {expandedAssymilink ? (
                <ChevronDown className="w-5 h-5 text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedAssymilink && (
              <div className="bg-white border-t border-gray-200">
                {assymilinkAccounts.map((account, index) => (
                  <Link
                    key={account.accountNumber}
                    to={`/account/${account.accountNumber}`}
                    className={`flex items-center justify-between p-4 pl-8 hover:bg-gray-50 transition-colors ${
                      index < assymilinkAccounts.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-4">
                        {account.name} <span className="text-gray-500">(...{account.accountNumber})</span>
                      </p>
                      <p className="balance-display text-right">{formatCurrency(account.balance)}</p>
                      <p className="text-xs text-gray-500 text-right mt-1">Available balance</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Link
              to="/accounts"
              className="flex items-center justify-center p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">Link external accounts</span>
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Explore more products</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6 mb-4">
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Credit cards</p>
            </Link>
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Checking</p>
            </Link>
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <PiggyBank className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Savings & CDs</p>
            </Link>
            <Link
              to="/accounts"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Work with advisors</p>
            </Link>
            <Link
              to="/business"
              className="flex-shrink-0 w-32 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-primary-600">Business</p>
            </Link>
          </div>
          <Link
            to="/accounts"
            className="block text-left py-3 px-6 border border-primary-600 text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors"
          >
            Explore products
          </Link>
        </div>
      </div>
    </div>
  );
}
