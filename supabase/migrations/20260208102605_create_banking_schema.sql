/*
  # Patek Global Banking Schema

  ## Overview
  Complete banking application schema with accounts, transactions, cards, and beneficiaries.

  ## New Tables
  
  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `email` (text)
  - `phone` (text)
  - `date_of_birth` (date)
  - `address` (text)
  - `city` (text)
  - `state` (text)
  - `zip_code` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `accounts`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `account_number` (text, unique)
  - `account_type` (text: 'checking', 'savings', 'credit')
  - `account_name` (text)
  - `balance` (decimal)
  - `currency` (text, default 'USD')
  - `status` (text, default 'active')
  - `created_at` (timestamptz)

  ### `transactions`
  - `id` (uuid, primary key)
  - `account_id` (uuid, references accounts)
  - `transaction_type` (text: 'debit', 'credit')
  - `category` (text)
  - `amount` (decimal)
  - `description` (text)
  - `merchant` (text)
  - `status` (text, default 'completed')
  - `transaction_date` (timestamptz)
  - `created_at` (timestamptz)

  ### `cards`
  - `id` (uuid, primary key)
  - `account_id` (uuid, references accounts)
  - `card_number` (text, last 4 digits only)
  - `card_type` (text: 'debit', 'credit')
  - `card_network` (text: 'visa', 'mastercard', 'amex')
  - `expiry_date` (text)
  - `status` (text, default 'active')
  - `created_at` (timestamptz)

  ### `beneficiaries`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `name` (text)
  - `account_number` (text)
  - `bank_name` (text)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Policies enforce user_id or account ownership checks
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  date_of_birth date,
  address text,
  city text,
  state text,
  zip_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  account_number text UNIQUE NOT NULL,
  account_type text NOT NULL CHECK (account_type IN ('checking', 'savings', 'credit')),
  account_name text NOT NULL,
  balance decimal(15, 2) DEFAULT 0.00,
  currency text DEFAULT 'USD',
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'frozen')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own accounts"
  ON accounts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own accounts"
  ON accounts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own accounts"
  ON accounts FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('debit', 'credit')),
  category text NOT NULL,
  amount decimal(15, 2) NOT NULL,
  description text,
  merchant text,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts
      WHERE accounts.id = transactions.account_id
      AND accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts
      WHERE accounts.id = transactions.account_id
      AND accounts.user_id = auth.uid()
    )
  );

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  card_number text NOT NULL,
  card_type text NOT NULL CHECK (card_type IN ('debit', 'credit')),
  card_network text NOT NULL CHECK (card_network IN ('visa', 'mastercard', 'amex', 'discover')),
  expiry_date text NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'expired')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cards"
  ON cards FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM accounts
      WHERE accounts.id = cards.account_id
      AND accounts.user_id = auth.uid()
    )
  );

-- Create beneficiaries table
CREATE TABLE IF NOT EXISTS beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  account_number text NOT NULL,
  bank_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own beneficiaries"
  ON beneficiaries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own beneficiaries"
  ON beneficiaries FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own beneficiaries"
  ON beneficiaries FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_cards_account_id ON cards(account_id);
CREATE INDEX IF NOT EXISTS idx_beneficiaries_user_id ON beneficiaries(user_id);