/*
  # Add Full Banking Features

  1. Modified Tables
    - `accounts` - Added credit_limit, minimum_payment, payment_due_date, apr columns for credit cards
    - `cards` - Added is_locked column for card controls
    - `profiles` - Added rewards_points column for Ultimate Rewards tracking

  2. New Tables
    - `bills` - Bill payment tracking with payee info, amounts, due dates, autopay settings
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `payee_name` (text)
      - `payee_category` (text)
      - `amount` (numeric)
      - `due_date` (date)
      - `is_autopay` (boolean)
      - `is_paid` (boolean)
      - `pay_from_account_id` (uuid, references accounts)
    - `notifications` - User notifications and alerts
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `message` (text)
      - `type` (text: info, alert, transaction, security)
      - `is_read` (boolean)

  3. Security
    - RLS enabled on bills and notifications tables
    - Policies restrict access to authenticated users viewing their own data

  4. Functions
    - `seed_user_data()` - Automatically populates new user accounts with sample banking data
    - Triggered after profile creation
    - Creates checking, savings, credit card accounts
    - Creates cards, transactions, bills, notifications, businesses, and beneficiaries
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'credit_limit') THEN
    ALTER TABLE accounts ADD COLUMN credit_limit numeric DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'minimum_payment') THEN
    ALTER TABLE accounts ADD COLUMN minimum_payment numeric DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'payment_due_date') THEN
    ALTER TABLE accounts ADD COLUMN payment_due_date date;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'apr') THEN
    ALTER TABLE accounts ADD COLUMN apr numeric DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cards' AND column_name = 'is_locked') THEN
    ALTER TABLE cards ADD COLUMN is_locked boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'rewards_points') THEN
    ALTER TABLE profiles ADD COLUMN rewards_points integer DEFAULT 48750;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  payee_name text NOT NULL,
  payee_category text NOT NULL DEFAULT 'other',
  account_number text NOT NULL DEFAULT '',
  amount numeric NOT NULL DEFAULT 0,
  due_date date,
  is_autopay boolean DEFAULT false,
  is_paid boolean DEFAULT false,
  pay_from_account_id uuid REFERENCES accounts(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bills"
  ON bills FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bills"
  ON bills FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bills"
  ON bills FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bills"
  ON bills FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION seed_user_data()
RETURNS TRIGGER AS $$
DECLARE
  v_checking_id uuid;
  v_savings_id uuid;
  v_premier_id uuid;
  v_fu_id uuid;
  v_sp_id uuid;
  v_sr_id uuid;
  v_biz1_id uuid;
  v_biz2_id uuid;
BEGIN
  INSERT INTO accounts (id, user_id, account_number, account_type, account_name, balance, currency, status)
  VALUES (gen_random_uuid(), NEW.id, '...2847', 'checking', 'TOTAL CHECKING', 8452.36, 'USD', 'active')
  RETURNING id INTO v_checking_id;

  INSERT INTO accounts (id, user_id, account_number, account_type, account_name, balance, currency, status)
  VALUES (gen_random_uuid(), NEW.id, '...9031', 'savings', 'CHASE SAVINGS', 25180.42, 'USD', 'active')
  RETURNING id INTO v_savings_id;

  INSERT INTO accounts (id, user_id, account_number, account_type, account_name, balance, currency, status)
  VALUES (gen_random_uuid(), NEW.id, '...4518', 'savings', 'CHASE PREMIER SAVINGS', 52340.00, 'USD', 'active')
  RETURNING id INTO v_premier_id;

  INSERT INTO accounts (id, user_id, account_number, account_type, account_name, balance, currency, status, credit_limit, minimum_payment, payment_due_date, apr)
  VALUES (gen_random_uuid(), NEW.id, '...4829', 'credit', 'FREEDOM UNLIMITED', 1247.89, 'USD', 'active', 15000, 35, CURRENT_DATE + INTERVAL '15 days', 20.49)
  RETURNING id INTO v_fu_id;

  INSERT INTO accounts (id, user_id, account_number, account_type, account_name, balance, currency, status, credit_limit, minimum_payment, payment_due_date, apr)
  VALUES (gen_random_uuid(), NEW.id, '...7156', 'credit', 'SAPPHIRE PREFERRED', 3842.15, 'USD', 'active', 25000, 95, CURRENT_DATE + INTERVAL '20 days', 21.49)
  RETURNING id INTO v_sp_id;

  INSERT INTO accounts (id, user_id, account_number, account_type, account_name, balance, currency, status, credit_limit, minimum_payment, payment_due_date, apr)
  VALUES (gen_random_uuid(), NEW.id, '...8234', 'credit', 'SAPPHIRE RESERVE', 2156.78, 'USD', 'active', 35000, 65, CURRENT_DATE + INTERVAL '25 days', 22.49)
  RETURNING id INTO v_sr_id;

  INSERT INTO cards (account_id, card_number, card_type, card_network, expiry_date, status)
  VALUES (v_checking_id, '2847', 'debit', 'visa', '2028-12-31', 'active');

  INSERT INTO cards (account_id, card_number, card_type, card_network, expiry_date, status)
  VALUES (v_fu_id, '4829', 'credit', 'visa', '2027-09-30', 'active');

  INSERT INTO cards (account_id, card_number, card_type, card_network, expiry_date, status)
  VALUES (v_sp_id, '7156', 'credit', 'visa', '2028-03-31', 'active');

  INSERT INTO cards (account_id, card_number, card_type, card_network, expiry_date, status)
  VALUES (v_sr_id, '8234', 'credit', 'visa', '2028-06-30', 'active');

  INSERT INTO transactions (account_id, transaction_type, category, amount, description, merchant, status, transaction_date) VALUES
    (v_checking_id, 'debit', 'dining', 47.82, 'Restaurant purchase', 'Chipotle Mexican Grill', 'completed', CURRENT_DATE - INTERVAL '1 day'),
    (v_checking_id, 'debit', 'groceries', 156.43, 'Grocery shopping', 'Whole Foods Market', 'completed', CURRENT_DATE - INTERVAL '1 day'),
    (v_checking_id, 'credit', 'income', 4250.00, 'Direct deposit', 'PAYROLL DIRECT DEP', 'completed', CURRENT_DATE - INTERVAL '2 days'),
    (v_checking_id, 'debit', 'transport', 45.00, 'Ride services', 'Uber', 'completed', CURRENT_DATE - INTERVAL '3 days'),
    (v_checking_id, 'debit', 'shopping', 89.99, 'Online purchase', 'Amazon.com', 'completed', CURRENT_DATE - INTERVAL '3 days'),
    (v_checking_id, 'debit', 'utilities', 124.50, 'Electric bill', 'ConEdison', 'completed', CURRENT_DATE - INTERVAL '4 days'),
    (v_checking_id, 'debit', 'entertainment', 15.99, 'Streaming service', 'Netflix', 'completed', CURRENT_DATE - INTERVAL '5 days'),
    (v_checking_id, 'debit', 'dining', 32.15, 'Coffee & snacks', 'Starbucks', 'completed', CURRENT_DATE - INTERVAL '5 days'),
    (v_checking_id, 'credit', 'transfer', 500.00, 'Transfer from savings', 'Chase Transfer', 'completed', CURRENT_DATE - INTERVAL '6 days'),
    (v_checking_id, 'debit', 'health', 25.00, 'Pharmacy', 'CVS Pharmacy', 'completed', CURRENT_DATE - INTERVAL '7 days'),
    (v_checking_id, 'debit', 'groceries', 203.17, 'Grocery shopping', 'Trader Joes', 'completed', CURRENT_DATE - INTERVAL '8 days'),
    (v_checking_id, 'debit', 'transport', 52.30, 'Gas station', 'Shell', 'completed', CURRENT_DATE - INTERVAL '9 days'),
    (v_checking_id, 'credit', 'income', 4250.00, 'Direct deposit', 'PAYROLL DIRECT DEP', 'completed', CURRENT_DATE - INTERVAL '16 days'),
    (v_checking_id, 'debit', 'housing', 2100.00, 'Rent payment', 'Avalon Bay Communities', 'completed', CURRENT_DATE - INTERVAL '1 day');

  INSERT INTO transactions (account_id, transaction_type, category, amount, description, merchant, status, transaction_date) VALUES
    (v_savings_id, 'credit', 'transfer', 1000.00, 'Transfer from checking', 'Chase Transfer', 'completed', CURRENT_DATE - INTERVAL '5 days'),
    (v_savings_id, 'credit', 'interest', 12.47, 'Interest payment', 'Chase Interest', 'completed', CURRENT_DATE - INTERVAL '30 days');

  INSERT INTO transactions (account_id, transaction_type, category, amount, description, merchant, status, transaction_date) VALUES
    (v_fu_id, 'debit', 'dining', 67.45, 'Restaurant', 'The Cheesecake Factory', 'completed', CURRENT_DATE - INTERVAL '2 days'),
    (v_fu_id, 'debit', 'groceries', 94.22, 'Grocery shopping', 'Costco', 'completed', CURRENT_DATE - INTERVAL '4 days'),
    (v_fu_id, 'debit', 'shopping', 234.99, 'Electronics', 'Best Buy', 'completed', CURRENT_DATE - INTERVAL '6 days'),
    (v_fu_id, 'credit', 'payment', 500.00, 'Payment thank you', 'Chase Payment', 'completed', CURRENT_DATE - INTERVAL '10 days');

  INSERT INTO transactions (account_id, transaction_type, category, amount, description, merchant, status, transaction_date) VALUES
    (v_sp_id, 'debit', 'travel', 489.00, 'Flight booking', 'Delta Airlines', 'completed', CURRENT_DATE - INTERVAL '3 days'),
    (v_sp_id, 'debit', 'dining', 156.78, 'Fine dining', 'Le Bernardin', 'completed', CURRENT_DATE - INTERVAL '5 days'),
    (v_sp_id, 'debit', 'travel', 312.50, 'Hotel stay', 'Marriott Hotels', 'completed', CURRENT_DATE - INTERVAL '8 days'),
    (v_sp_id, 'credit', 'payment', 1000.00, 'Payment thank you', 'Chase Payment', 'completed', CURRENT_DATE - INTERVAL '12 days');

  INSERT INTO beneficiaries (user_id, name, account_number, bank_name) VALUES
    (NEW.id, 'John Smith', '****4521', 'Bank of America'),
    (NEW.id, 'Sarah Johnson', '****7834', 'Wells Fargo'),
    (NEW.id, 'Michael Chen', '****2190', 'Citibank');

  INSERT INTO bills (user_id, payee_name, payee_category, amount, due_date, is_autopay, is_paid, pay_from_account_id) VALUES
    (NEW.id, 'ConEdison', 'utilities', 124.50, CURRENT_DATE + INTERVAL '10 days', true, false, v_checking_id),
    (NEW.id, 'AT&T Wireless', 'utilities', 89.99, CURRENT_DATE + INTERVAL '14 days', true, false, v_checking_id),
    (NEW.id, 'State Farm Insurance', 'insurance', 156.00, CURRENT_DATE + INTERVAL '18 days', false, false, v_checking_id),
    (NEW.id, 'Netflix', 'entertainment', 15.99, CURRENT_DATE + INTERVAL '5 days', true, false, v_fu_id),
    (NEW.id, 'Spotify', 'entertainment', 10.99, CURRENT_DATE + INTERVAL '8 days', true, false, v_fu_id),
    (NEW.id, 'Planet Fitness', 'health', 24.99, CURRENT_DATE + INTERVAL '1 day', true, false, v_checking_id),
    (NEW.id, 'Avalon Bay Communities', 'housing', 2100.00, CURRENT_DATE + INTERVAL '28 days', false, false, v_checking_id);

  INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
    (NEW.id, 'Welcome to Chase', 'Thank you for choosing Chase. Your accounts are ready to use.', 'info', false),
    (NEW.id, 'Direct Deposit Received', 'A direct deposit of $4,250.00 has been posted to your Total Checking account.', 'transaction', false),
    (NEW.id, 'Payment Due Reminder', 'Your Freedom Unlimited payment of $35.00 is due in 15 days.', 'alert', false),
    (NEW.id, 'New Sign-In Detected', 'We noticed a new sign-in to your account. If this was you, no action needed.', 'security', true),
    (NEW.id, 'Earn 5% Cash Back', 'Activate your quarterly bonus categories to earn 5% cash back on select purchases.', 'info', false);

  INSERT INTO businesses (id, user_id, business_name)
  VALUES (gen_random_uuid(), NEW.id, 'PATEK GLOBAL ASSET MANAGEMENT LLC')
  RETURNING id INTO v_biz1_id;

  INSERT INTO businesses (id, user_id, business_name)
  VALUES (gen_random_uuid(), NEW.id, 'ASSYMILINK META LLLP')
  RETURNING id INTO v_biz2_id;

  INSERT INTO business_accounts (business_id, account_number, account_name, balance, currency) VALUES
    (v_biz1_id, '...5847', 'BUS TOTAL CHECKING', 142847.33, 'USD'),
    (v_biz1_id, '...5031', 'BUS PERFORMANCE SAVINGS', 485230.00, 'USD'),
    (v_biz2_id, '...6421', 'BUS TOTAL CHECKING', 67421.89, 'USD'),
    (v_biz2_id, '...6100', 'BUS PERFORMANCE SAVINGS', 234100.00, 'USD');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created ON profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION seed_user_data();
