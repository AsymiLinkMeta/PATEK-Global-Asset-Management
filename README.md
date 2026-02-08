# Patek Global - Mobile Banking App

A modern, secure mobile banking application built with React, TypeScript, and Supabase.

## Features

- **Secure Authentication**: Email/password authentication with Supabase
- **Account Management**: View and manage multiple bank accounts
- **Transaction History**: Track all your financial transactions
- **Money Transfers**: Send money to beneficiaries
- **Profile Management**: Update your personal information
- **Mobile-Optimized**: Responsive design optimized for mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication)
- **Icons**: Lucide React
- **Routing**: React Router v6

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Database Schema

The app uses the following main tables:
- `profiles`: User profile information
- `accounts`: Bank accounts (checking, savings, credit)
- `transactions`: All financial transactions
- `cards`: Debit and credit cards
- `beneficiaries`: Saved transfer recipients

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure authentication with Supabase Auth
- Environment variables for sensitive configuration

## Theme

- Primary Color: #117ACA (Blue)
- Secondary Color: White
- Clean, modern mobile-first design
