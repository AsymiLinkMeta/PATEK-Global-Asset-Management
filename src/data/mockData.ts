const now = new Date();
const day = 86400000;

export interface MockProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  rewards_points: number;
}

export interface MockAccount {
  id: string;
  user_id: string;
  account_number: string;
  account_type: 'checking' | 'savings' | 'credit';
  account_name: string;
  balance: number;
  currency: string;
  status: string;
  credit_limit: number;
  minimum_payment: number;
  payment_due_date: string;
  apr: number;
  created_at: string;
}

export interface MockTransaction {
  id: string;
  account_id: string;
  transaction_type: 'debit' | 'credit';
  category: string;
  amount: number;
  description: string;
  merchant: string;
  status: 'completed' | 'pending';
  transaction_date: string;
}

export interface MockCard {
  id: string;
  account_id: string;
  card_number: string;
  card_type: string;
  card_network: string;
  expiry_date: string;
  status: string;
  is_locked: boolean;
}

export interface MockBeneficiary {
  id: string;
  user_id: string;
  name: string;
  account_number: string;
  bank_name: string;
}

export interface MockBill {
  id: string;
  user_id: string;
  payee_name: string;
  payee_category: string;
  amount: number;
  due_date: string;
  is_autopay: boolean;
  is_paid: boolean;
  pay_from_account_id: string | null;
}

export interface MockNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const USER_ID = 'demo-user-001';

export const defaultProfile: MockProfile = {
  id: USER_ID,
  full_name: 'Alex Morgan',
  email: 'alex.morgan@email.com',
  phone: '(305) 555-0142',
  date_of_birth: '1988-03-15',
  address: '1200 Brickell Avenue, Apt 3201',
  city: 'Miami',
  state: 'FL',
  zip_code: '33131',
  rewards_points: 204239,
};

export const defaultAccounts: MockAccount[] = [
  {
    id: 'acc-checking-5201',
    user_id: USER_ID,
    account_number: '5201',
    account_type: 'checking',
    account_name: 'SAPPHIRE CHECKING',
    balance: 204599.36,
    currency: 'USD',
    status: 'active',
    credit_limit: 0,
    minimum_payment: 0,
    payment_due_date: '',
    apr: 0,
    created_at: new Date(now.getTime() - 365 * day).toISOString(),
  },
  {
    id: 'acc-savings-9030',
    user_id: USER_ID,
    account_number: '9030',
    account_type: 'savings',
    account_name: 'PREMIER SAVINGS',
    balance: 3025784.20,
    currency: 'USD',
    status: 'active',
    credit_limit: 0,
    minimum_payment: 0,
    payment_due_date: '',
    apr: 0,
    created_at: new Date(now.getTime() - 300 * day).toISOString(),
  },
  {
    id: 'acc-checking-5900',
    user_id: USER_ID,
    account_number: '5900',
    account_type: 'checking',
    account_name: 'CPC CHECKING',
    balance: 816821.47,
    currency: 'USD',
    status: 'active',
    credit_limit: 0,
    minimum_payment: 0,
    payment_due_date: '',
    apr: 0,
    created_at: new Date(now.getTime() - 200 * day).toISOString(),
  },
  {
    id: 'acc-credit-9933',
    user_id: USER_ID,
    account_number: '9933',
    account_type: 'credit',
    account_name: 'FREEDOM UNLIMITED',
    balance: 3809.10,
    currency: 'USD',
    status: 'active',
    credit_limit: 10000,
    minimum_payment: 35,
    payment_due_date: new Date(now.getTime() + 15 * day).toISOString().split('T')[0],
    apr: 20.49,
    created_at: new Date(now.getTime() - 180 * day).toISOString(),
  },
  {
    id: 'acc-credit-2456',
    user_id: USER_ID,
    account_number: '2456',
    account_type: 'credit',
    account_name: 'SAPPHIRE PREFERRED',
    balance: 873.45,
    currency: 'USD',
    status: 'active',
    credit_limit: 15000,
    minimum_payment: 95,
    payment_due_date: new Date(now.getTime() + 20 * day).toISOString().split('T')[0],
    apr: 21.49,
    created_at: new Date(now.getTime() - 150 * day).toISOString(),
  },
  {
    id: 'acc-credit-2464',
    user_id: USER_ID,
    account_number: '2464',
    account_type: 'credit',
    account_name: 'SAPPHIRE RESERVE',
    balance: 4812.62,
    currency: 'USD',
    status: 'active',
    credit_limit: 25000,
    minimum_payment: 65,
    payment_due_date: new Date(now.getTime() + 25 * day).toISOString().split('T')[0],
    apr: 22.49,
    created_at: new Date(now.getTime() - 120 * day).toISOString(),
  },
];

export const defaultTransactions: MockTransaction[] = [
  { id: 'tx-001', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'dining', amount: 87.42, description: 'Dinner', merchant: 'Nobu Miami', status: 'pending', transaction_date: new Date(now.getTime() - 0.2 * day).toISOString() },
  { id: 'tx-002', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'shopping', amount: 127.45, description: 'Purchase', merchant: 'Amazon', status: 'completed', transaction_date: new Date(now.getTime() - 1 * day).toISOString() },
  { id: 'tx-003', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'groceries', amount: 234.18, description: 'Groceries', merchant: 'Whole Foods Market', status: 'completed', transaction_date: new Date(now.getTime() - 1.5 * day).toISOString() },
  { id: 'tx-004', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'dining', amount: 45.20, description: 'Dinner', merchant: 'Olive Garden', status: 'completed', transaction_date: new Date(now.getTime() - 2 * day).toISOString() },
  { id: 'tx-005', account_id: 'acc-checking-5201', transaction_type: 'credit', category: 'income', amount: 12500.00, description: 'Direct Deposit', merchant: 'Employer Direct Deposit', status: 'completed', transaction_date: new Date(now.getTime() - 3 * day).toISOString() },
  { id: 'tx-006', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'transport', amount: 52.30, description: 'Uber ride', merchant: 'Uber', status: 'completed', transaction_date: new Date(now.getTime() - 3.5 * day).toISOString() },
  { id: 'tx-007', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'utilities', amount: 189.00, description: 'Electric bill', merchant: 'FPL', status: 'completed', transaction_date: new Date(now.getTime() - 4 * day).toISOString() },
  { id: 'tx-008', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'entertainment', amount: 15.99, description: 'Subscription', merchant: 'Netflix', status: 'completed', transaction_date: new Date(now.getTime() - 5 * day).toISOString() },
  { id: 'tx-009', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'shopping', amount: 312.00, description: 'Purchase', merchant: 'Apple Store', status: 'completed', transaction_date: new Date(now.getTime() - 6 * day).toISOString() },
  { id: 'tx-010', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'health', amount: 45.00, description: 'Gym membership', merchant: 'Equinox', status: 'completed', transaction_date: new Date(now.getTime() - 7 * day).toISOString() },
  { id: 'tx-011', account_id: 'acc-savings-9030', transaction_type: 'credit', category: 'transfer', amount: 5000.00, description: 'Transfer from checking', merchant: 'Internal Transfer', status: 'completed', transaction_date: new Date(now.getTime() - 1 * day).toISOString() },
  { id: 'tx-012', account_id: 'acc-savings-9030', transaction_type: 'credit', category: 'income', amount: 142.87, description: 'Interest payment', merchant: 'Interest Payment', status: 'completed', transaction_date: new Date(now.getTime() - 30 * day).toISOString() },
  { id: 'tx-013', account_id: 'acc-checking-5900', transaction_type: 'debit', category: 'services', amount: 89.99, description: 'Software subscription', merchant: 'Adobe Creative Cloud', status: 'completed', transaction_date: new Date(now.getTime() - 1 * day).toISOString() },
  { id: 'tx-014', account_id: 'acc-checking-5900', transaction_type: 'credit', category: 'income', amount: 8500.00, description: 'Consulting payment', merchant: 'Client Payment', status: 'completed', transaction_date: new Date(now.getTime() - 5 * day).toISOString() },
  { id: 'tx-015', account_id: 'acc-credit-9933', transaction_type: 'debit', category: 'shopping', amount: 234.99, description: 'Online purchase', merchant: 'Amazon', status: 'pending', transaction_date: new Date(now.getTime() - 0.5 * day).toISOString() },
  { id: 'tx-016', account_id: 'acc-credit-9933', transaction_type: 'debit', category: 'dining', amount: 67.50, description: 'Dinner', merchant: 'The Cheesecake Factory', status: 'completed', transaction_date: new Date(now.getTime() - 2 * day).toISOString() },
  { id: 'tx-017', account_id: 'acc-credit-9933', transaction_type: 'debit', category: 'groceries', amount: 156.78, description: 'Groceries', merchant: 'Whole Foods', status: 'completed', transaction_date: new Date(now.getTime() - 3 * day).toISOString() },
  { id: 'tx-018', account_id: 'acc-credit-2456', transaction_type: 'debit', category: 'travel', amount: 567.00, description: 'Flight booking', merchant: 'United Airlines', status: 'completed', transaction_date: new Date(now.getTime() - 1 * day).toISOString() },
  { id: 'tx-019', account_id: 'acc-credit-2456', transaction_type: 'debit', category: 'dining', amount: 125.30, description: 'Fine dining', merchant: 'The Capital Grille', status: 'completed', transaction_date: new Date(now.getTime() - 2 * day).toISOString() },
  { id: 'tx-020', account_id: 'acc-credit-2464', transaction_type: 'debit', category: 'travel', amount: 450.00, description: 'Hotel stay', merchant: 'Marriott Bonvoy', status: 'pending', transaction_date: new Date(now.getTime() - 0.3 * day).toISOString() },
  { id: 'tx-021', account_id: 'acc-credit-2464', transaction_type: 'debit', category: 'dining', amount: 178.50, description: 'Dinner', merchant: 'STK Steakhouse', status: 'completed', transaction_date: new Date(now.getTime() - 2 * day).toISOString() },
  { id: 'tx-022', account_id: 'acc-credit-2464', transaction_type: 'debit', category: 'shopping', amount: 1250.00, description: 'Luxury purchase', merchant: 'Saks Fifth Avenue', status: 'completed', transaction_date: new Date(now.getTime() - 8 * day).toISOString() },
  { id: 'tx-023', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'transfer', amount: 2000.00, description: 'Zelle payment', merchant: 'Zelle - Sarah Johnson', status: 'completed', transaction_date: new Date(now.getTime() - 8 * day).toISOString() },
  { id: 'tx-024', account_id: 'acc-checking-5201', transaction_type: 'debit', category: 'bills', amount: 2100.00, description: 'Rent payment', merchant: 'Brickell Heights LLC', status: 'completed', transaction_date: new Date(now.getTime() - 12 * day).toISOString() },
  { id: 'tx-025', account_id: 'acc-checking-5201', transaction_type: 'credit', category: 'income', amount: 12500.00, description: 'Direct Deposit', merchant: 'Employer Direct Deposit', status: 'completed', transaction_date: new Date(now.getTime() - 17 * day).toISOString() },
];

export const defaultCards: MockCard[] = [
  { id: 'card-001', account_id: 'acc-credit-9933', card_number: '4847', card_type: 'credit', card_network: 'visa', expiry_date: '2027-08-01', status: 'active', is_locked: false },
  { id: 'card-002', account_id: 'acc-credit-2456', card_number: '7291', card_type: 'credit', card_network: 'visa', expiry_date: '2028-03-01', status: 'active', is_locked: false },
  { id: 'card-003', account_id: 'acc-credit-2464', card_number: '3156', card_type: 'credit', card_network: 'visa', expiry_date: '2028-11-01', status: 'active', is_locked: false },
  { id: 'card-004', account_id: 'acc-checking-5201', card_number: '8823', card_type: 'debit', card_network: 'visa', expiry_date: '2027-05-01', status: 'active', is_locked: false },
];

export const defaultBeneficiaries: MockBeneficiary[] = [
  { id: 'ben-001', user_id: USER_ID, name: 'Sarah Johnson', account_number: '****4521', bank_name: 'Bank of America' },
  { id: 'ben-002', user_id: USER_ID, name: 'Michael Chen', account_number: '****7832', bank_name: 'Wells Fargo' },
  { id: 'ben-003', user_id: USER_ID, name: 'Emily Davis', account_number: '****2190', bank_name: 'Chase' },
  { id: 'ben-004', user_id: USER_ID, name: 'Robert Wilson', account_number: '****6754', bank_name: 'Citibank' },
];

export const defaultBills: MockBill[] = [
  { id: 'bill-001', user_id: USER_ID, payee_name: 'FPL - Florida Power', payee_category: 'utilities', amount: 189.00, due_date: new Date(now.getTime() + 5 * day).toISOString().split('T')[0], is_autopay: true, is_paid: false, pay_from_account_id: 'acc-checking-5201' },
  { id: 'bill-002', user_id: USER_ID, payee_name: 'AT&T Internet', payee_category: 'utilities', amount: 65.00, due_date: new Date(now.getTime() + 8 * day).toISOString().split('T')[0], is_autopay: true, is_paid: false, pay_from_account_id: 'acc-checking-5201' },
  { id: 'bill-003', user_id: USER_ID, payee_name: 'Brickell Heights LLC', payee_category: 'housing', amount: 2100.00, due_date: new Date(now.getTime() + 12 * day).toISOString().split('T')[0], is_autopay: false, is_paid: false, pay_from_account_id: 'acc-checking-5201' },
  { id: 'bill-004', user_id: USER_ID, payee_name: 'State Farm Insurance', payee_category: 'insurance', amount: 156.00, due_date: new Date(now.getTime() + 18 * day).toISOString().split('T')[0], is_autopay: true, is_paid: false, pay_from_account_id: 'acc-checking-5201' },
  { id: 'bill-005', user_id: USER_ID, payee_name: 'Equinox Gym', payee_category: 'health', amount: 205.00, due_date: new Date(now.getTime() + 22 * day).toISOString().split('T')[0], is_autopay: true, is_paid: false, pay_from_account_id: 'acc-checking-5201' },
];

export const defaultNotifications: MockNotification[] = [
  { id: 'notif-001', user_id: USER_ID, title: 'Direct Deposit Received', message: 'A direct deposit of $12,500.00 has been credited to your Sapphire Checking account.', type: 'info', is_read: false, created_at: new Date(now.getTime() - 3 * day).toISOString() },
  { id: 'notif-002', user_id: USER_ID, title: 'Large Transaction Alert', message: 'A purchase of $1,250.00 was made at Saks Fifth Avenue on your Sapphire Reserve card.', type: 'warning', is_read: false, created_at: new Date(now.getTime() - 8 * day).toISOString() },
  { id: 'notif-003', user_id: USER_ID, title: 'Payment Due Soon', message: 'Your Freedom Unlimited card payment of $35.00 is due in 15 days.', type: 'warning', is_read: false, created_at: new Date(now.getTime() - 1 * day).toISOString() },
  { id: 'notif-004', user_id: USER_ID, title: 'Bill Paid Successfully', message: 'Your payment of $42.50 to Miami Water & Sewer has been processed.', type: 'info', is_read: true, created_at: new Date(now.getTime() - 2 * day).toISOString() },
  { id: 'notif-005', user_id: USER_ID, title: 'Security Alert', message: 'A new device was used to sign in to your account. If this was you, no action is needed.', type: 'warning', is_read: true, created_at: new Date(now.getTime() - 5 * day).toISOString() },
  { id: 'notif-006', user_id: USER_ID, title: 'Rewards Points Earned', message: 'You earned 1,250 Ultimate Rewards points from your recent purchase at United Airlines.', type: 'info', is_read: true, created_at: new Date(now.getTime() - 4 * day).toISOString() },
];
