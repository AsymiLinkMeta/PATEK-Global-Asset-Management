import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Bell, Fingerprint, Smartphone, CreditCard, AlertTriangle, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function Secure() {
  const { cards } = useData();
  const lockedCards = cards.filter(c => c.is_locked);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure</h1>
        <p className="text-sm text-gray-500">Protect your accounts and identity</p>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div className="bg-gradient-to-br from-[#0060f0] to-[#004aad] rounded-xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6" />
            <h2 className="font-semibold">Security status</h2>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-300" />
            <span className="text-sm">Two-factor authentication enabled</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-300" />
            <span className="text-sm">Account alerts active</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-300" />
            <span className="text-sm">Identity monitoring on</span>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Quick actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/card-controls" className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <Lock className="w-6 h-6 text-[#0060f0] mb-2" />
              <p className="text-sm font-semibold text-gray-900">Lock / unlock cards</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {lockedCards.length > 0 ? `${lockedCards.length} card locked` : 'All cards active'}
              </p>
            </Link>
            <Link to="/security" className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <Fingerprint className="w-6 h-6 text-[#0060f0] mb-2" />
              <p className="text-sm font-semibold text-gray-900">Sign-in settings</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Face ID, password</p>
            </Link>
            <Link to="/notifications" className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <Bell className="w-6 h-6 text-[#0060f0] mb-2" />
              <p className="text-sm font-semibold text-gray-900">Account alerts</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Manage alerts</p>
            </Link>
            <Link to="/credit-score" className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <Eye className="w-6 h-6 text-[#0060f0] mb-2" />
              <p className="text-sm font-semibold text-gray-900">Credit monitoring</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Credit Journey</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Security settings</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[
              { icon: Smartphone, label: 'Device management', desc: '2 registered devices', route: '/security' },
              { icon: AlertTriangle, label: 'Report fraud', desc: 'Dispute a transaction', route: '/help' },
              { icon: CreditCard, label: 'Travel notifications', desc: 'Let us know before you go', route: '/card-controls' },
              { icon: MapPin, label: 'ATM & branch locator', desc: 'Find nearby locations', route: '/atm-locator' },
            ].map((item, i, arr) => (
              <Link
                key={item.label}
                to={item.route}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
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
          <h2 className="text-base font-semibold text-gray-900 mb-3">Privacy & legal</h2>
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
                className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span className="text-sm text-gray-700">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
