import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ArrowLeftRight, Search, BarChart3, Shield } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
}

const tabs = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/pay-transfer', icon: ArrowLeftRight, label: 'Pay &\nTransfer' },
  { to: '/discover', icon: Search, label: 'Discover' },
  { to: '/plan-track', icon: BarChart3, label: 'Plan &\nTrack' },
  { to: '/secure', icon: Shield, label: 'Secure' },
];

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto z-50">
        <div className="flex justify-around items-stretch h-[64px]">
          {tabs.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 pt-1.5 pb-1 transition-colors ${
                  isActive ? 'text-[#0060f0]' : 'text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`mb-0.5 ${isActive ? 'text-[#0060f0]' : 'text-gray-500'}`}>
                    <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.2 : 1.8} />
                  </div>
                  <span className="text-[10px] leading-tight text-center whitespace-pre-line font-medium">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
