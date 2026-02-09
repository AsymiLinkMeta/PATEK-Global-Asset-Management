import { useState } from 'react';
import { ArrowLeft, FileText, Download, ChevronRight, Calendar, Filter, CreditCard, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Statement {
  id: string;
  accountName: string;
  accountNumber: string;
  period: string;
  date: string;
  type: 'statement' | 'notice' | 'tax';
}

const mockStatements: Statement[] = [
  { id: '1', accountName: 'SAPPHIRE CHECKING', accountNumber: '5201', period: 'January 2026', date: '2026-02-01', type: 'statement' },
  { id: '2', accountName: 'SAPPHIRE CHECKING', accountNumber: '5201', period: 'December 2025', date: '2026-01-01', type: 'statement' },
  { id: '3', accountName: 'PREMIER SAVINGS', accountNumber: '9030', period: 'January 2026', date: '2026-02-01', type: 'statement' },
  { id: '4', accountName: 'PREMIER SAVINGS', accountNumber: '9030', period: 'December 2025', date: '2026-01-01', type: 'statement' },
  { id: '5', accountName: 'CPC CHECKING', accountNumber: '5900', period: 'January 2026', date: '2026-02-01', type: 'statement' },
  { id: '6', accountName: 'FREEDOM UNLIMITED', accountNumber: '9933', period: 'January 2026', date: '2026-02-01', type: 'statement' },
  { id: '7', accountName: 'SAPPHIRE PREFERRED', accountNumber: '2456', period: 'January 2026', date: '2026-02-01', type: 'statement' },
  { id: '8', accountName: 'SAPPHIRE RESERVED', accountNumber: '2464', period: 'January 2026', date: '2026-02-01', type: 'statement' },
  { id: '9', accountName: 'All Accounts', accountNumber: '', period: '2025 Tax Year', date: '2026-01-31', type: 'tax' },
  { id: '10', accountName: 'SAPPHIRE CHECKING', accountNumber: '5201', period: 'November 2025', date: '2025-12-01', type: 'statement' },
  { id: '11', accountName: 'PREMIER SAVINGS', accountNumber: '9030', period: 'November 2025', date: '2025-12-01', type: 'statement' },
  { id: '12', accountName: 'FREEDOM UNLIMITED', accountNumber: '9933', period: 'November 2025', date: '2025-12-01', type: 'statement' },
];

const documentTypes = ['All', 'Statements', 'Tax Documents', 'Notices'];

export default function Statements() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAccount, setSelectedAccount] = useState('All');

  const accounts = ['All', ...new Set(mockStatements.map(s => s.accountName))];

  const filtered = mockStatements.filter(s => {
    const matchType = selectedType === 'All' ||
      (selectedType === 'Statements' && s.type === 'statement') ||
      (selectedType === 'Tax Documents' && s.type === 'tax') ||
      (selectedType === 'Notices' && s.type === 'notice');
    const matchAccount = selectedAccount === 'All' || s.accountName === selectedAccount;
    return matchType && matchAccount;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tax': return Calendar;
      case 'notice': return FileText;
      default: return FileText;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'tax': return { label: 'Tax', color: 'bg-green-50 text-green-700' };
      case 'notice': return { label: 'Notice', color: 'bg-amber-50 text-amber-700' };
      default: return { label: 'Statement', color: 'bg-blue-50 text-primary-700' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Statements & Documents</h1>
        </div>
        <p className="text-sm text-blue-100">View and download your account documents</p>
      </div>

      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
          {documentTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedAccount}
            onChange={e => setSelectedAccount(e.target.value)}
            className="text-sm text-gray-700 bg-transparent border-none focus:outline-none font-medium"
          >
            {accounts.map(acc => (
              <option key={acc} value={acc}>{acc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-6 pb-6">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No documents found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {filtered.map((statement, i) => {
              const badge = getTypeBadge(statement.type);
              const Icon = getTypeIcon(statement.type);
              return (
                <button
                  key={statement.id}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                    i < filtered.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-gray-900 truncate">{statement.period}</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {statement.accountName}
                      {statement.accountNumber && ` (...${statement.accountNumber})`}
                    </p>
                  </div>
                  <Download className="w-5 h-5 text-primary-600 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-6 pb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Paperless Statements</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Go paperless and access your statements online anytime. It's secure, convenient, and better for the environment.
          </p>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-green-800">Paperless is ON</span>
            </div>
            <span className="text-xs text-green-600">All accounts enrolled</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Statements are available online for the last 7 years. Tax documents are available for the last 3 years. If you need older documents, please contact customer service.
          </p>
        </div>
      </div>
    </div>
  );
}
