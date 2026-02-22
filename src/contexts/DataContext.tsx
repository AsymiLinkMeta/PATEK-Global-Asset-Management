import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  MockProfile, MockAccount, MockTransaction, MockCard, MockBeneficiary, MockBill, MockNotification,
  defaultProfile, defaultAccounts, defaultTransactions, defaultCards, defaultBeneficiaries, defaultBills, defaultNotifications,
} from '../data/mockData';

interface DataContextType {
  profile: MockProfile;
  accounts: MockAccount[];
  transactions: MockTransaction[];
  cards: MockCard[];
  beneficiaries: MockBeneficiary[];
  bills: MockBill[];
  notifications: MockNotification[];
  updateProfile: (updates: Partial<MockProfile>) => void;
  updateAccount: (id: string, updates: Partial<MockAccount>) => void;
  addTransaction: (tx: Omit<MockTransaction, 'id'>) => void;
  updateCard: (id: string, updates: Partial<MockCard>) => void;
  updateBill: (id: string, updates: Partial<MockBill>) => void;
  addBill: (bill: Omit<MockBill, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  getAccountByNumber: (num: string) => MockAccount | undefined;
  getAccountById: (id: string) => MockAccount | undefined;
  getTransactionsForAccount: (accountId: string) => MockTransaction[];
  getCardsForAccount: (accountId: string) => MockCard[];
  unreadNotificationCount: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'chase-app-data';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* use defaults */ }
  return null;
}

function saveToStorage(data: Record<string, unknown>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const stored = loadFromStorage();

  const [profile, setProfile] = useState<MockProfile>(stored?.profile || defaultProfile);
  const [accounts, setAccounts] = useState<MockAccount[]>(stored?.accounts || defaultAccounts);
  const [transactions, setTransactions] = useState<MockTransaction[]>(stored?.transactions || defaultTransactions);
  const [cards, setCards] = useState<MockCard[]>(stored?.cards || defaultCards);
  const [beneficiaries] = useState<MockBeneficiary[]>(stored?.beneficiaries || defaultBeneficiaries);
  const [bills, setBills] = useState<MockBill[]>(stored?.bills || defaultBills);
  const [notifications, setNotifications] = useState<MockNotification[]>(stored?.notifications || defaultNotifications);

  useEffect(() => {
    saveToStorage({ profile, accounts, transactions, cards, beneficiaries, bills, notifications });
  }, [profile, accounts, transactions, cards, beneficiaries, bills, notifications]);

  const updateProfile = useCallback((updates: Partial<MockProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const updateAccount = useCallback((id: string, updates: Partial<MockAccount>) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const addTransaction = useCallback((tx: Omit<MockTransaction, 'id'>) => {
    const newTx: MockTransaction = { ...tx, id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` };
    setTransactions(prev => [newTx, ...prev]);
  }, []);

  const updateCard = useCallback((id: string, updates: Partial<MockCard>) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const updateBill = useCallback((id: string, updates: Partial<MockBill>) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  }, []);

  const addBill = useCallback((bill: Omit<MockBill, 'id'>) => {
    setBills(prev => [...prev, { ...bill, id: `bill-${Date.now()}` }]);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  }, []);

  const getAccountByNumber = useCallback((num: string) => accounts.find(a => a.account_number === num), [accounts]);
  const getAccountById = useCallback((id: string) => accounts.find(a => a.id === id), [accounts]);

  const getTransactionsForAccount = useCallback((accountId: string) =>
    transactions
      .filter(t => t.account_id === accountId)
      .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()),
  [transactions]);

  const getCardsForAccount = useCallback((accountId: string) => cards.filter(c => c.account_id === accountId), [cards]);

  const unreadNotificationCount = notifications.filter(n => !n.is_read).length;

  return (
    <DataContext.Provider value={{
      profile, accounts, transactions, cards, beneficiaries, bills, notifications,
      updateProfile, updateAccount, addTransaction, updateCard, updateBill, addBill,
      markNotificationRead, getAccountByNumber, getAccountById, getTransactionsForAccount,
      getCardsForAccount, unreadNotificationCount,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
