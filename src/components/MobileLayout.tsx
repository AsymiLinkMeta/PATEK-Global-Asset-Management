import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, ArrowLeftRight, User, Receipt, Briefcase } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary-500' : 'text-gray-600'
              }`
            }
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </NavLink>

          <NavLink
            to="/accounts"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary-500' : 'text-gray-600'
              }`
            }
          >
            <CreditCard className="w-6 h-6 mb-1" />
            <span className="text-xs">Accounts</span>
          </NavLink>

          <NavLink
            to="/business"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary-500' : 'text-gray-600'
              }`
            }
          >
            <Briefcase className="w-6 h-6 mb-1" />
            <span className="text-xs">Business</span>
          </NavLink>

          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary-500' : 'text-gray-600'
              }`
            }
          >
            <ArrowLeftRight className="w-6 h-6 mb-1" />
            <span className="text-xs">Transfer</span>
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary-500' : 'text-gray-600'
              }`
            }
          >
            <Receipt className="w-6 h-6 mb-1" />
            <span className="text-xs">Activity</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary-500' : 'text-gray-600'
              }`
            }
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
