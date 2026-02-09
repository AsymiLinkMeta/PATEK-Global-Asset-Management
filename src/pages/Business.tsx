import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, User, CreditCard, Plus, Send, Building2, PiggyBank, Users, Home as HomeIcon, Briefcase } from 'lucide-react';

interface BusinessAccount {
  name: string;
  accountNumber: string;
  balance: number;
}

interface Business {
  id: string;
  name: string;
  accounts: BusinessAccount[];
}

export default function Business() {
  const navigate = useNavigate();
  const [expandedBusiness, setExpandedBusiness] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<'personal' | 'business'>('business');

  const businesses: Business[] = [
    {
      id: '1',
      name: 'PATEK GLOBAL ASSET MANAGEMENT LLC.',
      accounts: [
        { name: 'BUS COMPLETE CHK', accountNumber: '8335', balance: 0 },
        { name: 'BUS PLATNIUM CHK', accountNumber: '2176', balance: 0 }
      ]
    },
    {
      id: '2',
      name: 'ASSYMILINK META LLLP',
      accounts: [
        { name: 'BUS COMPLETE CHK', accountNumber: '3989', balance: 0 },
        { name: 'BUS PLATNIUM CHK', accountNumber: '1557', balance: 0 }
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const toggleBusiness = (businessId: string) => {
    setExpandedBusiness(expandedBusiness === businessId ? null : businessId);
  };

  const getTotalBalance = (business: Business) => {
    return business.accounts.reduce((sum, acc) => sum + acc.balance, 0);
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

      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Snapshot</h3>
              <p className="text-gray-600 text-sm">Your money in this month is <span className="font-semibold">$0</span></p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Accounts</h2>
        {businesses.map((business) => (
          <div key={business.id} className="mb-6">
            <h3 className="text-base font-normal text-gray-900 mb-3">{business.name}</h3>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleBusiness(business.id)}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  expandedBusiness === business.id
                    ? 'bg-gradient-to-br from-[#005EB8] to-[#0071CE] text-white'
                    : 'hover:bg-gray-50 bg-white'
                }`}
              >
                <span className={`font-medium ${expandedBusiness === business.id ? 'text-white' : 'text-gray-900'}`}>
                  Bank accounts ({business.accounts.length})
                </span>
                <span className={`text-base ${expandedBusiness === business.id ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(getTotalBalance(business))}
                </span>
              </button>

              {expandedBusiness === business.id && (
                <div className="bg-white">
                  {business.accounts.map((account, index) => (
                    <Link
                      key={account.accountNumber}
                      to={`/account/${account.accountNumber}`}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        index < business.accounts.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">
                          {account.name} <span className="text-gray-500">(...{account.accountNumber})</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-normal text-gray-900">{formatCurrency(account.balance)}</p>
                        <p className="text-xs text-gray-500 mt-1">Available balance</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <Link
          to="/accounts"
          className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:bg-gray-50 transition-colors mt-6"
        >
          <span className="text-gray-900 font-medium">Link external accounts</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore more products</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/accounts"
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">Credit cards</span>
            </Link>

            <Link
              to="/accounts"
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">Checking</span>
            </Link>

            <Link
              to="/accounts"
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                <PiggyBank className="w-8 h-8 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-blue-600">Savings & CDs</span>
            </Link>

            <Link
              to="/accounts"
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">Work with our advisors</span>
            </Link>

            <Link
              to="/business"
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">Business</span>
            </Link>
          </div>

          <button className="w-full mt-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Explore products
          </button>
        </div>
      </div>
    </div>
  );
}
