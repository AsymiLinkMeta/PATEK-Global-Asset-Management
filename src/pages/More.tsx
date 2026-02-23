import { Link } from 'react-router-dom';
import { Shield, Lock, Bell, Fingerprint, CreditCard, AlertTriangle, ChevronRight, MapPin, HelpCircle, FileText, Settings, LogOut } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

export default function More() {
  const { cards } = useData();
  const { signOut } = useAuth();
  const lockedCards = cards.filter(c => c.is_locked);

  return (
    <div className="min-h-screen bg-[#f5f6f7]">
      <div className="bg-white px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">More</h1>
        <p className="text-sm text-gray-500">Settings, security, and help</p>
      </div>

      <div className="px-5 py-5 space-y-5">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">Security</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[
              { icon: Lock, label: 'Lock / unlock cards', desc: lockedCards.length > 0 ? `${lockedCards.length} card locked` : 'All cards active', route: '/card-controls' },
              { icon: Fingerprint, label: 'Sign-in & security', desc: 'Face ID, password, 2FA', route: '/security' },
              { icon: Shield, label: 'Security center', desc: 'Monitor your account', route: '/security-center' },
              { icon: Bell, label: 'Account alerts', desc: 'Manage notifications', route: '/notifications' },
            ].map((item, i, arr) => (
              <Link
                key={item.label}
                to={item.route}
                className={`flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                  i < arr.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <item.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-[11px] text-gray-500">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">Account</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[
              { icon: Settings, label: 'Personal details', desc: 'Name, email, phone', route: '/personal-details' },
              { icon: CreditCard, label: 'Card controls', desc: 'Travel notifications, spending limits', route: '/card-controls' },
              { icon: FileText, label: 'Statements & documents', desc: 'View & download', route: '/statements' },
              { icon: MapPin, label: 'ATM & branch locator', desc: 'Find nearby locations', route: '/atm-locator' },
            ].map((item, i, arr) => (
              <Link
                key={item.label}
                to={item.route}
                className={`flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                  i < arr.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <item.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-[11px] text-gray-500">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">Help & support</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[
              { icon: HelpCircle, label: 'Help & support', route: '/help' },
              { icon: AlertTriangle, label: 'Report fraud', route: '/help' },
            ].map((item, i, arr) => (
              <Link
                key={item.label}
                to={item.route}
                className={`flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                  i < arr.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <item.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <p className="text-sm font-medium text-gray-900 flex-1">{item.label}</p>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">Legal</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[
              { label: 'Privacy Policy', route: '/privacy-policy' },
              { label: 'Terms of Use', route: '/terms-of-use' },
              { label: 'Consumer Privacy Notice', route: '/consumer-privacy' },
              { label: 'Accessibility', route: '/accessibility' },
            ].map((item, i, arr) => (
              <Link
                key={item.label}
                to={item.route}
                className={`flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                  i < arr.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-sm text-gray-700">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-3.5 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium text-red-500">Sign out</span>
        </button>
      </div>
    </div>
  );
}
