import { useState } from 'react';
import { ArrowLeft, Send, Search, User, Phone, Mail, Check, ChevronRight, Clock, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type Step = 'contacts' | 'amount' | 'review' | 'success';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  initials: string;
  color: string;
}

const recentContacts: Contact[] = [
  { id: '1', name: 'Sarah Mitchell', email: 's.mitchell@email.com', initials: 'SM', color: 'bg-teal-500' },
  { id: '2', name: 'James Rodriguez', phone: '(305) 555-0142', initials: 'JR', color: 'bg-blue-500' },
  { id: '3', name: 'Emily Chen', email: 'emily.chen@email.com', initials: 'EC', color: 'bg-rose-500' },
  { id: '4', name: 'Michael Brooks', phone: '(212) 555-0198', initials: 'MB', color: 'bg-amber-500' },
  { id: '5', name: 'Lisa Patel', email: 'lisa.p@email.com', initials: 'LP', color: 'bg-emerald-500' },
];

const recentTransfers = [
  { name: 'Sarah Mitchell', amount: 250, date: 'Feb 5' },
  { name: 'James Rodriguez', amount: 1500, date: 'Feb 2' },
  { name: 'Emily Chen', amount: 85, date: 'Jan 28' },
];

const sourceAccounts = [
  { name: 'SAPPHIRE CHECKING', number: '5201', balance: 204599.36 },
  { name: 'CPC CHECKING', number: '5900', balance: 816821.47 },
];

export default function ZelleSend() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState(sourceAccounts[0].number);
  const [memo, setMemo] = useState('');

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const filteredContacts = recentContacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.includes(searchQuery)
  );

  const selectedAccount = sourceAccounts.find(a => a.number === fromAccount);

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#6D1ED4] text-white px-6 pt-12 pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-center">Money Sent!</h1>
          <p className="text-2xl font-bold text-center mt-2">{formatCurrency(parseFloat(amount))}</p>
          <p className="text-sm text-center mt-1 opacity-80">to {selectedContact?.name}</p>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">To</span>
              <span className="text-sm text-gray-900">{selectedContact?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">From</span>
              <span className="text-sm text-gray-900">{selectedAccount?.name} (...{fromAccount})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(parseFloat(amount))}</span>
            </div>
            {memo && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Memo</span>
                <span className="text-sm text-gray-900">{memo}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm font-medium text-green-600">Sent</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Money sent with Zelle typically arrives within minutes when the recipient is already enrolled. If the recipient hasn't enrolled yet, they'll receive a notification and have 14 days to accept the payment.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="block bg-primary-600 text-white text-center py-3.5 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Done
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#6D1ED4] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => {
              if (step === 'contacts') { navigate(-1); return; }
              if (step === 'amount') setStep('contacts');
              if (step === 'review') setStep('amount');
            }}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            <h1 className="text-xl font-semibold">Zelle</h1>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">by Chase</span>
          </div>
        </div>
        <div className="flex gap-1 mt-3">
          {['contacts', 'amount', 'review'].map((s, i) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${
              ['contacts', 'amount', 'review'].indexOf(step) >= i ? 'bg-white' : 'bg-white/30'
            }`} />
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {step === 'contacts' && (
          <div className="space-y-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Name, email, or mobile number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6D1ED4] focus:border-transparent"
              />
            </div>

            <button className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-[#6D1ED4] rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Add a new recipient</span>
            </button>

            {recentTransfers.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Recent</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {recentTransfers.map((t, i) => {
                    const contact = recentContacts.find(c => c.name === t.name);
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (contact) { setSelectedContact(contact); setStep('amount'); }
                        }}
                        className="flex flex-col items-center flex-shrink-0"
                      >
                        <div className={`w-12 h-12 ${contact?.color || 'bg-gray-400'} rounded-full flex items-center justify-center text-white font-semibold text-sm mb-1`}>
                          {contact?.initials}
                        </div>
                        <p className="text-xs text-gray-700 font-medium">{t.name.split(' ')[0]}</p>
                        <p className="text-[10px] text-gray-400">{t.date}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Contacts</h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {filteredContacts.map((contact, i) => (
                  <button
                    key={contact.id}
                    onClick={() => { setSelectedContact(contact); setStep('amount'); }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                      i < filteredContacts.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 ${contact.color} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                      {contact.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.email || contact.phone}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'amount' && selectedContact && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 ${selectedContact.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                {selectedContact.initials}
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedContact.name}</p>
                <p className="text-xs text-gray-500">{selectedContact.email || selectedContact.phone}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From account</label>
              <select
                value={fromAccount}
                onChange={e => setFromAccount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D1ED4] focus:border-transparent"
              >
                {sourceAccounts.map(acc => (
                  <option key={acc.number} value={acc.number}>
                    {acc.name} (...{acc.number}) - {formatCurrency(acc.balance)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#6D1ED4] focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Daily limit: $5,000 | Monthly: $40,000</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Memo (optional)</label>
              <input
                type="text"
                value={memo}
                onChange={e => setMemo(e.target.value)}
                placeholder="What's it for?"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D1ED4] focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Money typically arrives in minutes</span>
            </div>

            <button
              onClick={() => setStep('review')}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full bg-[#6D1ED4] text-white py-3.5 rounded-full font-medium hover:bg-[#5B18B2] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Review
            </button>
          </div>
        )}

        {step === 'review' && selectedContact && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">Review & send</h2>

            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
              <div className={`w-14 h-14 ${selectedContact.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
                {selectedContact.initials}
              </div>
              <p className="font-medium text-gray-900">{selectedContact.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(parseFloat(amount))}</p>
              {memo && <p className="text-sm text-gray-500 mt-1">"{memo}"</p>}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">From</span>
                <span className="text-sm text-gray-900">{selectedAccount?.name} (...{fromAccount})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">To</span>
                <span className="text-sm text-gray-900">{selectedContact.email || selectedContact.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Delivery</span>
                <span className="text-sm text-gray-900">Within minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Fee</span>
                <span className="text-sm font-medium text-green-600">Free</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                By pressing "Send," you authorize Chase to debit the amount shown from your account and send it to the recipient via Zelle. Only send money to people you trust. Payments with Zelle are not covered by purchase protection.
              </p>
            </div>

            <button
              onClick={() => setStep('success')}
              className="w-full bg-[#6D1ED4] text-white py-3.5 rounded-full font-medium hover:bg-[#5B18B2] transition-colors"
            >
              Send {formatCurrency(parseFloat(amount))}
            </button>
            <button
              onClick={() => setStep('amount')}
              className="w-full text-[#6D1ED4] py-3 text-sm font-medium"
            >
              Go back and edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
