import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowRight, Plus, User } from 'lucide-react';

interface Account {
  id: string;
  account_name: string;
  account_number: string;
  balance: number;
}

interface Beneficiary {
  id: string;
  name: string;
  account_number: string;
  bank_name: string;
}

export default function Transfer() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [recipientBank, setRecipientBank] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    const { data: accountsData } = await supabase
      .from('accounts')
      .select('id, account_name, account_number, balance')
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (accountsData && accountsData.length > 0) {
      setAccounts(accountsData);
      setSelectedAccount(accountsData[0].id);
    }

    const { data: beneficiariesData } = await supabase
      .from('beneficiaries')
      .select('*')
      .eq('user_id', user.id);

    if (beneficiariesData) setBeneficiaries(beneficiariesData);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);
    if (!selectedAccountData) {
      setError('Please select an account');
      return;
    }

    if (transferAmount > selectedAccountData.balance) {
      setError('Insufficient balance');
      return;
    }

    setLoading(true);

    try {
      const newBalance = selectedAccountData.balance - transferAmount;

      const { error: updateError } = await supabase
        .from('accounts')
        .update({ balance: newBalance })
        .eq('id', selectedAccount);

      if (updateError) throw updateError;

      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          account_id: selectedAccount,
          transaction_type: 'debit',
          category: 'transfer',
          amount: transferAmount,
          description: description || `Transfer to ${recipientName}`,
          merchant: recipientName,
          status: 'completed',
        });

      if (transactionError) throw transactionError;

      setSuccess(true);
      setAmount('');
      setRecipientName('');
      setRecipientAccount('');
      setRecipientBank('');
      setDescription('');

      loadData();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  const selectBeneficiary = (beneficiary: Beneficiary) => {
    setRecipientName(beneficiary.name);
    setRecipientAccount(beneficiary.account_number);
    setRecipientBank(beneficiary.bank_name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Transfer Money</h1>
      </div>

      <div className="px-6 py-6">
        {beneficiaries.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Recipients</h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
              {beneficiaries.map((beneficiary) => (
                <button
                  key={beneficiary.id}
                  onClick={() => selectBeneficiary(beneficiary)}
                  className="flex flex-col items-center min-w-[80px] p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-2">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center truncate w-full">
                    {beneficiary.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleTransfer} className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Account
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.account_name} - ${account.balance.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-2xl font-semibold"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="1234567890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={recipientBank}
                onChange={(e) => setRecipientBank(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Bank Name"
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Memo (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="What's this transfer for?"
              rows={3}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Transfer successful!
            </div>
          )}

          <button
            type="submit"
            disabled={loading || accounts.length === 0}
            className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing Transfer...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
