import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import AccountDetail from './pages/AccountDetail';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';
import Profile from './pages/Profile';
import Business from './pages/Business';
import CreditScore from './pages/CreditScore';
import PayBills from './pages/PayBills';
import DepositCheck from './pages/DepositCheck';
import Rewards from './pages/Rewards';
import SpendingInsights from './pages/SpendingInsights';
import CardControls from './pages/CardControls';
import Security from './pages/Security';
import PersonalDetails from './pages/PersonalDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ConsumerPrivacy from './pages/ConsumerPrivacy';
import SecurityCenter from './pages/SecurityCenter';
import Accessibility from './pages/Accessibility';
import Statements from './pages/Statements';
import WireTransfer from './pages/WireTransfer';
import ZelleSend from './pages/ZelleSend';
import ATMLocator from './pages/ATMLocator';
import HelpSupport from './pages/HelpSupport';
import MobileLayout from './components/MobileLayout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MobileLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/business" element={<Business />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/account/:accountId" element={<AccountDetail />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/credit-score" element={<CreditScore />} />
                <Route path="/pay-bills" element={<PayBills />} />
                <Route path="/deposit-check" element={<DepositCheck />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/spending-insights" element={<SpendingInsights />} />
                <Route path="/card-controls" element={<CardControls />} />
                <Route path="/card-controls/:cardId" element={<CardControls />} />
                <Route path="/security" element={<Security />} />
                <Route path="/personal-details" element={<PersonalDetails />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/consumer-privacy" element={<ConsumerPrivacy />} />
                <Route path="/security-center" element={<SecurityCenter />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/statements" element={<Statements />} />
                <Route path="/wire-transfer" element={<WireTransfer />} />
                <Route path="/zelle" element={<ZelleSend />} />
                <Route path="/atm-locator" element={<ATMLocator />} />
                <Route path="/help" element={<HelpSupport />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </MobileLayout>
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
