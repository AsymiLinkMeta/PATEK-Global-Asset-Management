import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Plus, Zap, Wifi, Shield, Tv, Music, Dumbbell, Home, CheckCircle2, Clock, ChevronRight, RotateCcw, Package, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Bill {
  id: string;
  payee_name: string;
  payee_category: string;
  amount: number;
  due_date: string;
  is_autopay: boolean;
  is_paid: boolean;
}

interface Account {
  id: string;
  account_name: string;
  account_number: string;
  balance: number;
}

const categoryIcons: Record<string, typeof Zap> = {
  utilities: Zap,
  entertainment: Tv,
  insurance: Shield,
  health: Dumbbell,
  housing: Home,
  storage: Package,
  services: Server,
};

export default function PayBills() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bills, setBills] = useState<Bill[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingBillId, setPayingBillId] = useState<string | null>(null);
  const [showAddBill, setShowAddBill] = useState(false);
  const [newPayee, setNewPayee] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('utilities');
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    const [billsRes, accountsRes] = await Promise.all([
      supabase
        .from('bills')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true }),
      supabase
        .from('accounts')
        .select('id, account_name, account_number, balance')
        .eq('user_id', user.id)
        .eq('status', 'active'),
    ]);

    if (billsRes.data) setBills(billsRes.data);
    if (accountsRes.data) {
      setAccounts(accountsRes.data);
      if (accountsRes.data.length > 0) setSelectedAccount(accountsRes.data[0].id);
    }
    setLoading(false);
  };

  const handlePayBill = async (bill: Bill) => {
    setPayingBillId(bill.id);
    await supabase
      .from('bills')
      .update({ is_paid: true })
      .eq('id', bill.id);

    const account = accounts.find(a => a.id === selectedAccount) || accounts[0];
    if (account) {
      await supabase.from('transactions').insert({
        account_id: account.id,
        transaction_type: 'debit',
        category: 'bills',
        amount: bill.amount,
        description: `Bill payment - ${bill.payee_name}`,
        merchant: bill.payee_name,
        status: 'completed',
      });
    }

    await loadData();
    setPayingBillId(null);
  };

  const handleAddBill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPayee || !newAmount) return;

    await supabase.from('bills').insert({
      user_id: user.id,
      payee_name: newPayee,
      payee_category: newCategory,
      amount: parseFloat(newAmount),
      due_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      is_autopay: false,
      is_paid: false,
      pay_from_account_id: selectedAccount || null,
    });

    setNewPayee('');
    setNewAmount('');
    setShowAddBill(false);
    await loadData();
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const getDaysUntilDue = (dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86400000);
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  };

  const getDueColor = (dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86400000);
    if (days < 0) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    return 'text-gray-500';
  };

  const unpaidBills = bills.filter(b => !b.is_paid);
  const paidBills = bills.filter(b => b.is_paid);
  const totalDue = unpaidBills.reduce((sum, b) => sum + b.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 flex-1">Pay Bills</h1>
          <button
            onClick={() => setShowAddBill(!showAddBill)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Plus className="w-6 h-6 text-primary-600" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-5 text-white">
          <p className="text-primary-100 text-sm mb-1">Total upcoming</p>
          <p className="text-3xl font-bold mb-1">{formatCurrency(totalDue)}</p>
          <p className="text-primary-200 text-sm">{unpaidBills.length} bills due</p>
        </div>
      </div>

      <div className="px-6 py-6">
        {showAddBill && (
          <form onSubmit={handleAddBill} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Add New Payee</h3>
            <input
              type="text"
              value={newPayee}
              onChange={(e) => setNewPayee(e.target.value)}
              placeholder="Payee name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <input
              type="number"
              step="0.01"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="insurance">Insurance</option>
              <option value="health">Health & Fitness</option>
              <option value="housing">Housing</option>
              <option value="storage">Storage</option>
              <option value="services">Business Services</option>
              <option value="other">Other</option>
            </select>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowAddBill(false)} className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700">
                Cancel
              </button>
              <button type="submit" className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Add Payee
              </button>
            </div>
          </form>
        )}

        {unpaidBills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Upcoming</h2>
            <div className="space-y-3">
              {unpaidBills.map((bill) => {
                const IconComponent = categoryIcons[bill.payee_category] || Zap;
                return (
                  <div key={bill.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 truncate">{bill.payee_name}</p>
                          <p className="font-semibold text-gray-900 flex-shrink-0 ml-2">{formatCurrency(bill.amount)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className={`text-sm ${getDueColor(bill.due_date)}`}>
                            {getDaysUntilDue(bill.due_date)}
                          </p>
                          {bill.is_autopay && (
                            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              <RotateCcw className="w-3 h-3" />
                              AutoPay
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePayBill(bill)}
                      disabled={payingBillId === bill.id}
                      className="mt-3 w-full py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      {payingBillId === bill.id ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {paidBills.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Paid</h2>
            <div className="space-y-3">
              {paidBills.map((bill) => {
                const IconComponent = categoryIcons[bill.payee_category] || Zap;
                return (
                  <div key={bill.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 truncate">{bill.payee_name}</p>
                          <p className="font-semibold text-gray-900 flex-shrink-0 ml-2">{formatCurrency(bill.amount)}</p>
                        </div>
                        <p className="text-sm text-green-600">Paid</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {bills.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No bills set up yet</p>
            <button
              onClick={() => setShowAddBill(true)}
              className="text-primary-600 font-medium"
            >
              Add your first payee
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
