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
