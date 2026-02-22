import { Link } from 'react-router-dom';
import { Send, FileText, Building2, ArrowLeftRight, CreditCard, Plus, ChevronRight, Landmark, Smartphone } from 'lucide-react';

const quickActions = [
  { icon: Send, label: 'Send with\nZelle', route: '/zelle', color: 'bg-[#6D1ED4]' },
  { icon: ArrowLeftRight, label: 'Transfer\nbetween', route: '/transfer', color: 'bg-[#0060f0]' },
  { icon: FileText, label: 'Pay\nbills', route: '/pay-bills', color: 'bg-[#0060f0]' },
  { icon: Building2, label: 'Wire\ntransfer', route: '/wire-transfer', color: 'bg-[#0060f0]' },
];

const recentRecipients = [
  { name: 'Sarah J.', initials: 'SJ', color: 'bg-teal-500' },
  { name: 'Michael C.', initials: 'MC', color: 'bg-blue-500' },
  { name: 'Emily D.', initials: 'ED', color: 'bg-rose-500' },
  { name: 'Robert W.', initials: 'RW', color: 'bg-amber-500' },
];

const paymentOptions = [
  { icon: Smartphone, label: 'Deposit checks', desc: 'Use your camera to deposit', route: '/deposit-check' },
  { icon: CreditCard, label: 'Pay credit card', desc: 'Make a card payment', route: '/transfer' },
  { icon: Landmark, label: 'External transfers', desc: 'Transfer to other banks', route: '/transfer' },
];

export default function PayTransfer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Pay & Transfer</h1>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ icon: Icon, label, route, color }) => (
            <Link key={route} to={route} className="flex flex-col items-center">
              <div className={`${color} w-14 h-14 rounded-full flex items-center justify-center mb-2`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] text-gray-700 font-medium text-center leading-tight whitespace-pre-line">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Send again with Zelle</h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-5">
            {recentRecipients.map((r) => (
              <Link key={r.name} to="/zelle" className="flex flex-col items-center">
                <div className={`${r.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm mb-1`}>
                  {r.initials}
                </div>
                <span className="text-[11px] text-gray-700 font-medium">{r.name}</span>
              </Link>
            ))}
            <Link to="/zelle" className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-1">
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[11px] text-gray-500 font-medium">New</span>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {paymentOptions.map(({ icon: Icon, label, desc, route }) => (
            <Link
              key={label}
              to={route}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
