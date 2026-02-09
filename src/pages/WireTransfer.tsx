import { useState } from 'react';
import { ArrowLeft, Send, Building2, Globe, AlertTriangle, ChevronRight, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

type WireType = 'domestic' | 'international';
type Step = 'type' | 'details' | 'review' | 'success';

const sourceAccounts = [
  { name: 'SAPPHIRE CHECKING', number: '5201', balance: 204599.36 },
  { name: 'PREMIER SAVINGS', number: '9030', balance: 3025784.20 },
  { name: 'CPC CHECKING', number: '5900', balance: 816821.47 },
];

export default function WireTransfer() {
  const [step, setStep] = useState<Step>('type');
  const [wireType, setWireType] = useState<WireType>('domestic');
  const [fromAccount, setFromAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [bankName, setBankName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [memo, setMemo] = useState('');

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const selectedAccount = sourceAccounts.find(a => a.number === fromAccount);
  const fee = wireType === 'domestic' ? 25 : 45;

  const canProceedDetails = fromAccount && amount && recipientName && bankName &&
    (wireType === 'domestic' ? routingNumber : swiftCode) && accountNumber;

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600 text-white px-6 pt-12 pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-center">Wire Transfer Submitted</h1>
          <p className="text-sm text-green-100 text-center mt-1">
            Confirmation #WR{Date.now().toString().slice(-8)}
          </p>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(parseFloat(amount))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Wire fee</span>
              <span className="text-sm text-gray-900">{formatCurrency(fee)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-sm font-bold text-gray-900">{formatCurrency(parseFloat(amount) + fee)}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">From</span>
              <span className="text-sm text-gray-900">{selectedAccount?.name} (...{fromAccount})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">To</span>
              <span className="text-sm text-gray-900">{recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Type</span>
              <span className="text-sm text-gray-900 capitalize">{wireType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Est. delivery</span>
              <span className="text-sm text-gray-900">{wireType === 'domestic' ? 'Same business day' : '1-5 business days'}</span>
            </div>
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
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => {
              if (step === 'type') return;
              if (step === 'details') setStep('type');
              if (step === 'review') setStep('details');
            }}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Wire Transfer</h1>
        </div>
        <div className="flex gap-1 mt-3">
          {['type', 'details', 'review'].map((s, i) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${
              ['type', 'details', 'review'].indexOf(step) >= i ? 'bg-white' : 'bg-white/30'
            }`} />
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {step === 'type' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Select wire type</h2>

            <button
              onClick={() => { setWireType('domestic'); setStep('details'); }}
              className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Domestic Wire</h3>
                  <p className="text-sm text-gray-600">Send within the United States</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">Fee: $25.00</span>
                    <span className="text-xs text-gray-500">Same day delivery</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
              </div>
            </button>

            <button
              onClick={() => { setWireType('international'); setStep('details'); }}
              className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">International Wire</h3>
                  <p className="text-sm text-gray-600">Send to a foreign country</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">Fee: $45.00</span>
                    <span className="text-xs text-gray-500">1-5 business days</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
              </div>
            </button>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-900 text-sm mb-1">Important</h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Wire transfers are typically irrevocable once sent. Please verify all recipient information carefully. Domestic wires submitted before 4:00 PM ET on a business day are processed the same day.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/transfer"
              className="block text-center text-sm text-primary-600 font-medium mt-4"
            >
              Looking for a regular transfer instead?
            </Link>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              {wireType === 'domestic' ? 'Domestic' : 'International'} wire details
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From account</label>
              <select
                value={fromAccount}
                onChange={e => setFromAccount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select account</option>
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
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              {selectedAccount && (
                <p className="text-xs text-gray-500 mt-1">Available: {formatCurrency(selectedAccount.balance)}</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recipient Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    placeholder="Full legal name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    placeholder="Recipient's bank"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {wireType === 'domestic' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Routing number</label>
                    <input
                      type="text"
                      value={routingNumber}
                      onChange={e => setRoutingNumber(e.target.value)}
                      placeholder="9 digits"
                      maxLength={9}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SWIFT/BIC code</label>
                    <input
                      type="text"
                      value={swiftCode}
                      onChange={e => setSwiftCode(e.target.value)}
                      placeholder="8-11 characters"
                      maxLength={11}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    placeholder="Recipient's account number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Memo (optional)</label>
                  <input
                    type="text"
                    value={memo}
                    onChange={e => setMemo(e.target.value)}
                    placeholder="Reference or description"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('review')}
              disabled={!canProceedDetails}
              className="w-full bg-primary-600 text-white py-3.5 rounded-full font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Review wire transfer
            </button>
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">Review & confirm</h2>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Transfer Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Type</span>
                  <span className="text-sm text-gray-900 capitalize">{wireType} wire</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">From</span>
                  <span className="text-sm text-gray-900">{selectedAccount?.name} (...{fromAccount})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(parseFloat(amount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Wire fee</span>
                  <span className="text-sm text-gray-900">{formatCurrency(fee)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-900">Total debit</span>
                  <span className="text-sm font-bold text-gray-900">{formatCurrency(parseFloat(amount) + fee)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Recipient Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="text-sm text-gray-900">{recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Bank</span>
                  <span className="text-sm text-gray-900">{bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{wireType === 'domestic' ? 'Routing #' : 'SWIFT'}</span>
                  <span className="text-sm text-gray-900">{wireType === 'domestic' ? routingNumber : swiftCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Account #</span>
                  <span className="text-sm text-gray-900">...{accountNumber.slice(-4)}</span>
                </div>
                {memo && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Memo</span>
                    <span className="text-sm text-gray-900">{memo}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-primary-800 leading-relaxed">
                  By submitting this wire transfer, you authorize Chase to debit your account for the amount plus applicable fees. Wire transfers are typically irrevocable once processed.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep('success')}
              className="w-full bg-primary-600 text-white py-3.5 rounded-full font-medium hover:bg-primary-700 transition-colors"
            >
              Submit wire transfer
            </button>
            <button
              onClick={() => setStep('details')}
              className="w-full text-primary-600 py-3 text-sm font-medium"
            >
              Go back and edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
