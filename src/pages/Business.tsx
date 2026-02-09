import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, User, CreditCard, Plus, Send, Building2 } from 'lucide-react';

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
  const [expandedBusiness, setExpandedBusiness] = useState<string | null>(null);

  const businesses: Business[] = [
    {
      id: '1',
      name: 'Patek Global Enterprises',
      accounts: [
        { name: 'BUSINESS CHECKING', accountNumber: '7401', balance: 1845623.89 },
        { name: 'PAYROLL ACCOUNT', accountNumber: '7402', balance: 284512.45 },
        { name: 'BUSINESS SAVINGS', accountNumber: '7403', balance: 5621847.33 }
      ]
    },
    {
      id: '2',
      name: 'Millennium Holdings LLC',
      accounts: [
        { name: 'OPERATING ACCOUNT', accountNumber: '8501', balance: 3247891.12 },
        { name: 'RESERVE ACCOUNT', accountNumber: '8502', balance: 1928456.78 }
      ]
    },
    {
      id: '3',
      name: 'Crown Properties Group',
      accounts: [
        { name: 'MAIN CHECKING', accountNumber: '9601', balance: 892345.67 },
        { name: 'ESCROW ACCOUNT', accountNumber: '9602', balance: 456789.23 },
        { name: 'INVESTMENT ACCOUNT', accountNumber: '9603', balance: 2134567.89 }
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

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Business Banking</h1>
          <p className="text-gray-600">Manage your business accounts</p>
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
        {businesses.map((business) => (
          <div key={business.id} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">{business.name}</h2>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <span className="text-gray-600">•••</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleBusiness(business.id)}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  expandedBusiness === business.id
                    ? 'bg-gradient-to-br from-[#005EB8] to-primary-500 text-white'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-medium ${expandedBusiness === business.id ? 'text-white' : 'text-gray-900'}`}>
                    Bank accounts ({business.accounts.length})
                  </span>
                  <span className={`text-sm ${expandedBusiness === business.id ? 'text-white/90' : 'text-gray-500'}`}>
                    Total: {formatCurrency(getTotalBalance(business))}
                  </span>
                </div>
                {expandedBusiness === business.id ? (
                  <ChevronDown className="w-5 h-5 text-white" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedBusiness === business.id && (
                <div className="bg-white">
                  {business.accounts.map((account, index) => (
                    <Link
                      key={account.accountNumber}
                      to={`/account/${account.accountNumber}`}
                      className={`flex items-center justify-between p-4 pl-8 hover:bg-gray-50 transition-colors ${
                        index < business.accounts.length - 1 ? 'border-b border-gray-200' : ''
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
          </div>
        ))}

        <div className="mt-8">
          <Link
            to="/accounts"
            className="block text-center py-3 bg-white border border-primary-600 text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors shadow-sm"
          >
            Open new business account
          </Link>
        </div>
      </div>
    </div>
  );
}
