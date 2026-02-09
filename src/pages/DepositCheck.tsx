import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Camera, CheckCircle2, Upload, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Account {
  id: string;
  account_name: string;
  account_number: string;
  balance: number;
  account_type: string;
}

type Step = 'select' | 'amount' | 'capture-front' | 'capture-back' | 'review' | 'success';

export default function DepositCheck() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<Step>('select');
  const [frontCaptured, setFrontCaptured] = useState(false);
  const [backCaptured, setBackCaptured] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, [user]);

  const loadAccounts = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('accounts')
      .select('id, account_name, account_number, balance, account_type')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .in('account_type', ['checking', 'savings']);

    if (data) {
      setAccounts(data);
      if (data.length > 0) setSelectedAccount(data[0].id);
    }
  };

  const handleSubmitDeposit = async () => {
    setProcessing(true);
    const depositAmount = parseFloat(amount);
    const account = accounts.find(a => a.id === selectedAccount);

    if (account) {
      await supabase
        .from('accounts')
        .update({ balance: account.balance + depositAmount })
        .eq('id', selectedAccount);

      await supabase.from('transactions').insert({
        account_id: selectedAccount,
        transaction_type: 'credit',
        category: 'deposit',
        amount: depositAmount,
        description: 'Mobile check deposit',
        merchant: 'Mobile Deposit',
        status: 'pending',
      });
    }

    setTimeout(() => {
      setProcessing(false);
      setStep('success');
    }, 2000);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const renderStep = () => {
    switch (step) {
      case 'select':
        return (
          <div className="px-6 py-6 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <label className="block text-sm font-medium text-gray-700 mb-3">Deposit to</label>
              <div className="space-y-3">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setSelectedAccount(acc.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      selectedAccount === acc.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{acc.account_name}</p>
                      <p className="text-sm text-gray-500">{acc.account_number}</p>
                    </div>
                    <p className="font-semibold text-gray-900">{formatCurrency(acc.balance)}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep('amount')}
              disabled={!selectedAccount}
              className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        );

      case 'amount':
        return (
          <div className="px-6 py-6 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <label className="block text-sm font-medium text-gray-700 mb-3">Check amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-3xl font-semibold"
                  placeholder="0.00"
                  autoFocus
                />
              </div>
              <p className="text-sm text-gray-500 mt-3">Daily deposit limit: $10,000.00</p>
            </div>

            <button
              onClick={() => setStep('capture-front')}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        );

      case 'capture-front':
      case 'capture-back':
        const isFront = step === 'capture-front';
        return (
          <div className="px-6 py-6 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isFront ? 'Front of check' : 'Back of check'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {isFront
                  ? 'Position the front of your check within the frame'
                  : 'Sign the back of your check and write "For mobile deposit only"'}
              </p>

              <div className="relative bg-gray-100 rounded-xl aspect-[16/9] flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                {(isFront ? frontCaptured : backCaptured) ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                    <p className="text-sm font-medium text-green-600">Image captured</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Camera className="w-12 h-12 text-gray-400" />
                    <p className="text-sm text-gray-500">Tap to capture</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    if (isFront) setFrontCaptured(true);
                    else setBackCaptured(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  Capture
                </button>
                <button
                  onClick={() => {
                    if (isFront) setFrontCaptured(true);
                    else setBackCaptured(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Upload
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                if (isFront) {
                  setFrontCaptured(true);
                  setStep('capture-back');
                } else {
                  setBackCaptured(true);
                  setStep('review');
                }
              }}
              disabled={isFront ? !frontCaptured : !backCaptured}
              className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        );

      case 'review':
        const selectedAcc = accounts.find(a => a.id === selectedAccount);
        return (
          <div className="px-6 py-6 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Review deposit</h3>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Deposit to</span>
                <span className="font-medium text-gray-900">{selectedAcc?.account_name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Account</span>
                <span className="text-gray-700">{selectedAcc?.account_number}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-500">Availability</span>
                <span className="text-gray-700">Next business day</span>
              </div>

              <div className="flex gap-3 pt-2">
                <div className="flex-1 bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  <Image className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Front captured</span>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  <Image className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Back captured</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                By submitting, you confirm the check has not been previously deposited and you will retain the original check for 14 days.
              </p>
            </div>

            <button
              onClick={handleSubmitDeposit}
              disabled={processing}
              className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {processing ? 'Processing deposit...' : 'Submit Deposit'}
            </button>
          </div>
        );

      case 'success':
        return (
          <div className="px-6 py-16 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Deposit Submitted</h2>
            <p className="text-gray-600 mb-2">
              Your deposit of {formatCurrency(parseFloat(amount))} is being processed.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Funds will be available by the next business day.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                setStep('select');
                setAmount('');
                setFrontCaptured(false);
                setBackCaptured(false);
              }}
              className="mt-3 text-primary-600 font-medium"
            >
              Deposit another check
            </button>
          </div>
        );
    }
  };

  const stepTitles: Record<Step, string> = {
    'select': 'Deposit Check',
    'amount': 'Enter Amount',
    'capture-front': 'Front of Check',
    'capture-back': 'Back of Check',
    'review': 'Review Deposit',
    'success': 'Deposit Submitted',
  };

  const goBack = () => {
    const steps: Step[] = ['select', 'amount', 'capture-front', 'capture-back', 'review'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">{stepTitles[step]}</h1>
        </div>

        {step !== 'success' && (
          <div className="flex gap-1.5 mt-4">
            {['select', 'amount', 'capture-front', 'capture-back', 'review'].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  ['select', 'amount', 'capture-front', 'capture-back', 'review'].indexOf(step) >= i
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {renderStep()}
    </div>
  );
}
