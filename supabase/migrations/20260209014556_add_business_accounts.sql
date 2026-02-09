/*
  # Add Business Accounts Support

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `business_name` (text)
      - `created_at` (timestamptz)
    
    - `business_accounts`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `account_number` (text)
      - `account_name` (text)
      - `balance` (decimal)
      - `currency` (text, default 'USD')
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `businesses` table
    - Enable RLS on `business_accounts` table
    - Add policies for authenticated users to read their own business data
    - Add policies for users to read accounts for their businesses
*/

CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own businesses"
  ON businesses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own businesses"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own businesses"
  ON businesses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own businesses"
  ON businesses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS business_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  account_number text NOT NULL,
  account_name text NOT NULL,
  balance decimal(15, 2) DEFAULT 0,
  currency text DEFAULT 'USD',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE business_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view business accounts"
  ON business_accounts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_accounts.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert business accounts"
  ON business_accounts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_accounts.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update business accounts"
  ON business_accounts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_accounts.business_id
      AND businesses.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_accounts.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete business accounts"
  ON business_accounts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = business_accounts.business_id
      AND businesses.user_id = auth.uid()
    )
  );
