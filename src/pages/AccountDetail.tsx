import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowLeftRight, DollarSign, MoreHorizontal, CreditCard, Lock, FileText, ChevronRight } from 'lucide-react';

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  account_name: string;
  balance: number;
  currency: string;
  status: string;
  credit_limit: number;
  minimum_payment: number;
  payment_due_date: string;
  apr: number;
}

interface Transaction {
  id: string;
  transaction_type: string;
  category: string;
  amount: number;
  description: string;
  merchant: string;
  transaction_date: string;
  status: string;
}

interface CardData {
  id: string;
  card_number: string;
  is_locked: boolean;
}

export default function AccountDetail() {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [accountId, user]);

  const staticAccounts: Record<string, Account> = {
    '5201': { id: '5201', account_number: '5201', account_type: 'checking', account_name: 'SAPPHIRE CHECKING', balance: 204599.36, currency: 'USD', status: 'active', credit_limit: 0, minimum_payment: 0, payment_due_date: '', apr: 0 },
    '9030': { id: '9030', account_number: '9030', account_type: 'savings', account_name: 'PREMIER SAVINGS', balance: 3025784.20, currency: 'USD', status: 'active', credit_limit: 0, minimum_payment: 0, payment_due_date: '', apr: 0 },
    '5900': { id: '5900', account_number: '5900', account_type: 'checking', account_name: 'CPC CHECKING', balance: 816821.47, currency: 'USD', status: 'active', credit_limit: 0, minimum_payment: 0, payment_due_date: '', apr: 0 },
    '9933': { id: '9933', account_number: '9933', account_type: 'credit', account_name: 'FREEDOM UNLIMITED', balance: 3809.10, currency: 'USD', status: 'active', credit_limit: 10000, minimum_payment: 35, payment_due_date: new Date(Date.now() + 15 * 86400000).toISOString(), apr: 20.49 },
    '2456': { id: '2456', account_number: '2456', account_type: 'credit', account_name: 'SAPPHIRE PREFERRED', balance: 873.45, currency: 'USD', status: 'active', credit_limit: 15000, minimum_payment: 95, payment_due_date: new Date(Date.now() + 20 * 86400000).toISOString(), apr: 21.49 },
    '2464': { id: '2464', account_number: '2464', account_type: 'credit', account_name: 'SAPPHIRE RESERVED', balance: 4812.62, currency: 'USD', status: 'active', credit_limit: 25000, minimum_payment: 65, payment_due_date: new Date(Date.now() + 25 * 86400000).toISOString(), apr: 22.49 },
  };

  const staticTransactions: Record<string, Transaction[]> = {
    '5201': [
      { id: '1', transaction_type: 'debit', category: 'shopping', amount: 127.45, description: 'Purchase', merchant: 'Amazon', transaction_date: new Date().toISOString(), status: 'completed' },
      { id: '2', transaction_type: 'debit', category: 'dining', amount: 45.20, description: 'Dinner', merchant: 'Olive Garden', transaction_date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
      { id: '3', transaction_type: 'credit', category: 'income', amount: 2500.00, description: 'Salary', merchant: 'Employer Direct Deposit', transaction_date: new Date(Date.now() - 172800000).toISOString(), status: 'completed' },
    ],
    '9030': [
      { id: '4', transaction_type: 'credit', category: 'transfer', amount: 500.00, description: 'Transfer from checking', merchant: 'Internal Transfer', transaction_date: new Date().toISOString(), status: 'completed' },
      { id: '5', transaction_type: 'credit', category: 'income', amount: 15.30, description: 'Interest', merchant: 'Interest Payment', transaction_date: new Date(Date.now() - 2592000000).toISOString(), status: 'completed' },
    ],
    '5900': [
      { id: '6', transaction_type: 'debit', category: 'services', amount: 89.99, description: 'Software subscription', merchant: 'Adobe', transaction_date: new Date().toISOString(), status: 'completed' },
      { id: '7', transaction_type: 'debit', category: 'utilities', amount: 125.50, description: 'Electric bill', merchant: 'Power Company', transaction_date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
    ],
    '9933': [
      { id: '8', transaction_type: 'debit', category: 'shopping', amount: 234.99, description: 'Online purchase', merchant: 'Amazon', transaction_date: new Date().toISOString(), status: 'completed' },
      { id: '9', transaction_type: 'debit', category: 'dining', amount: 67.50, description: 'Dinner', merchant: 'Restaurant', transaction_date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
      { id: '10', transaction_type: 'debit', category: 'groceries', amount: 156.78, description: 'Groceries', merchant: 'Whole Foods', transaction_date: new Date(Date.now() - 172800000).toISOString(), status: 'completed' },
    ],
    '2456': [
      { id: '11', transaction_type: 'debit', category: 'travel', amount: 567.00, description: 'Flight booking', merchant: 'United Airlines', transaction_date: new Date().toISOString(), status: 'completed' },
      { id: '12', transaction_type: 'debit', category: 'dining', amount: 125.30, description: 'Fine dining', merchant: 'The Capital Grille', transaction_date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
      { id: '13', transaction_type: 'debit', category: 'shopping', amount: 89.99, description: 'Online purchase', merchant: 'Best Buy', transaction_date: new Date(Date.now() - 172800000).toISOString(), status: 'completed' },
    ],
    '2464': [
      { id: '14', transaction_type: 'debit', category: 'travel', amount: 450.00, description: 'Hotel stay', merchant: 'Marriott', transaction_date: new Date().toISOString(), status: 'completed' },
      { id: '15', transaction_type: 'debit', category: 'dining', amount: 78.50, description: 'Lunch', merchant: 'Local Bistro', transaction_date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
      { id: '16', transaction_type: 'credit', category: 'refund', amount: 125.00, description: 'Purchase return', merchant: 'Nordstrom', transaction_date: new Date(Date.now() - 172800000).toISOString(), status: 'completed' },
    ],
  };

  const loadData = async () => {
    if (!accountId || !user) return;

    if (staticAccounts[accountId]) {
      setAccount(staticAccounts[accountId]);
      setTransactions(staticTransactions[accountId] || []);
      setLoading(false);
      return;
    }

    const { data: accountData } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', accountId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (accountData) {
      setAccount(accountData);

      const { data: txData } = await supabase
        .from('transactions')
        .select('*')
        .eq('account_id', accountData.id)
        .order('transaction_date', { ascending: false })
        .limit(20);

      if (txData) setTransactions(txData);

      const { data: cardData } = await supabase
        .from('cards')
        .select('id, card_number, is_locked')
        .eq('account_id', accountData.id)
        .maybeSingle();

      if (cardData) setCard(cardData);
    }

    setLoading(false);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const getCardImage = (name: string) => {
    if (name.includes('FREEDOM')) return '/freedom_unlimited-removebg-preview_(1).png';
    if (name.includes('PREFERRED')) return '/chase-sapphire-preferred-lead.jpg';
    if (name.includes('RESERVE')) return '/chase_sapphire_reserve_06_24_25-removebg-preview_(1).png';
    return null;
  };

  const groupTransactionsByDate = (txs: Transaction[]) => {
    const groups: Record<string, Transaction[]> = {};
    txs.forEach(tx => {
      const date = new Date(tx.transaction_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(tx);
    });
    return groups;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <p className="text-gray-500 mb-4">Account not found</p>
        <button onClick={() => navigate('/dashboard')} className="text-primary-600 font-medium">
          Back to Home
        </button>
      </div>
    );
  }

  const transactionGroups = groupTransactionsByDate(transactions);
  const cardImage = getCardImage(account.account_name);
  const isCredit = account.account_type === 'credit';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">{account.account_name}</h1>
            <p className="text-sm text-gray-500">
              <span className="capitalize">{account.account_type}</span> {account.account_number}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 text-white">
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              {cardImage && (
                <img src={cardImage} alt={account.account_name} className="w-20 h-12 object-contain" />
              )}
              <div className="flex-1 text-right">
                {isCredit ? (
                  <>
                    <p className="text-primary-100 text-sm mb-2">Current Balance</p>
                    <p className="balance-display">{formatCurrency(account.balance)}</p>
                  </>
                ) : (
                  <>
                    <p className="text-primary-100 text-sm mb-2">Available Balance</p>
                    <p className="balance-display">{formatCurrency(account.balance)}</p>
                  </>
                )}
              </div>
            </div>

            {isCredit && account.credit_limit > 0 && (
              <div className="flex justify-between text-sm mb-4">
                <div>
                  <p className="text-primary-100">Available Credit</p>
                  <p className="font-semibold">{formatCurrency(account.credit_limit - account.balance)}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary-100">Credit Limit</p>
                  <p className="font-semibold">{formatCurrency(account.credit_limit)}</p>
                </div>
              </div>
            )}

            {isCredit && (
              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-primary-200 text-xs">Min. Payment</p>
                    <p className="font-semibold">{formatCurrency(account.minimum_payment)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-primary-200 text-xs">Due Date</p>
                    <p className="font-semibold">
                      {account.payment_due_date
                        ? new Date(account.payment_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-200 text-xs">APR</p>
                    <p className="font-semibold">{account.apr}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              to="/transfer"
              className="flex-1 bg-white text-primary-600 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {isCredit ? 'Pay' : 'Transfer'}
            </Link>
            <Link
              to="/pay-bills"
              className="flex-1 bg-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              Pay Bills
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {card && (
          <div className="flex gap-3 mb-6">
            <Link
              to={`/card-controls/${card.id}`}
              className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
            >
              {card.is_locked ? (
                <Lock className="w-5 h-5 text-red-600" />
              ) : (
                <CreditCard className="w-5 h-5 text-primary-600" />
              )}
              <div>
                <p className="font-medium text-gray-900 text-sm">Card Controls</p>
                <p className="text-xs text-gray-500">{card.is_locked ? 'Card locked' : 'Manage card'}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
            <Link
              to="/transactions"
              className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
            >
              <FileText className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Statements</p>
                <p className="text-xs text-gray-500">View activity</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
            </Link>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
          <Link to="/transactions" className="text-primary-600 text-sm font-medium">
            See all
          </Link>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(transactionGroups).map(([date, txs]) => (
              <div key={date}>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{date}</p>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                  {txs.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.transaction_type === 'credit' ? 'bg-green-50' : 'bg-gray-100'
                        }`}>
                          {tx.transaction_type === 'credit' ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tx.merchant}</p>
                          <p className="text-sm text-gray-500 capitalize">{tx.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${tx.transaction_type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                          {tx.transaction_type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </p>
                        {tx.status === 'pending' && (
                          <p className="text-xs text-yellow-600">Pending</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
