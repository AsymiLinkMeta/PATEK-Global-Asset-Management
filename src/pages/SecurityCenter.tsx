import { ArrowLeft, Shield, CreditCard, Lock, Smartphone, Eye, Users, AlertTriangle, ChevronRight, Fingerprint, Bell, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

const protectionFeatures = [
  {
    icon: Monitor,
    title: '24/7 Credit Card Fraud Monitoring',
    description: 'We help safeguard your credit card purchases using sophisticated fraud monitoring. We monitor for fraud 24/7 and can text, email or call you if there are unusual purchases on your credit card.'
  },
  {
    icon: Lock,
    title: 'Data Encryption',
    description: 'When you sign in to chase.com or the Chase Mobile app, we encrypt your data to help ensure your personal information stays confidential.'
  },
  {
    icon: Fingerprint,
    title: 'Secure Technology',
    description: 'Skip the password, not the security. Use your phone\'s biometric setting or your password manager. Our app supports Apple TouchID, FaceID or Android fingerprint/facial recognition login for quick and secure account access.'
  },
  {
    icon: Eye,
    title: 'Safeguards Against Suspicious Activity',
    description: 'If we spot suspicious activity on your account, we may place a temporary hold on it. This is an extra security step to help ensure it\'s really you and not someone else using your account.'
  },
  {
    icon: Bell,
    title: 'Additional Validation Checks',
    description: 'When you sign in for the first time or we see unusual login or account activity, we\'ll use additional validation checks like mobile app notifications or one time code to authenticate you.'
  },
  {
    icon: Shield,
    title: 'Secure Connection to Apps',
    description: 'When you decide to share your Chase account information with an app or company, we work to make it safe. We require them to connect directly with us so you don\'t give them your Chase password.'
  }
];

const securityLinks = [
  { title: 'How we protect you', subtitle: 'Learn about our security measures', to: '#' },
  { title: 'What you can do', subtitle: 'Steps to protect your accounts', to: '#' },
  { title: 'Help safeguard seniors', subtitle: 'Protect loved ones from financial abuse', to: '#' },
  { title: 'Spot scams', subtitle: 'Recognize and avoid common scams', to: '#' },
  { title: 'How to use Zelle safely', subtitle: 'Tips for safe money transfers', to: '#' },
  { title: 'Social media scams', subtitle: 'Stay safe on social platforms', to: '#' },
  { title: 'Online dos & don\'ts', subtitle: 'Cybersecurity best practices', to: '#' },
  { title: 'Report fraud', subtitle: 'Let us know about suspicious activity', to: '#' },
];

export default function SecurityCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Security Center</h1>
        </div>
        <p className="text-sm text-blue-100">How we help protect you and your money</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-gradient-to-br from-primary-600 to-[#005EB8] rounded-xl p-5 text-white">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-1">Our Commitment to You</h2>
              <p className="text-sm text-blue-100 leading-relaxed">
                If you see that money was removed from your checking or savings accounts through our mobile or online banking and you didn't authorize the transaction, let us know right away. We'll reimburse you for those unauthorized transactions when you contact us promptly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-1">
            <CreditCard className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-gray-900">Zero Liability Protection</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed ml-8">
            You won't be held responsible for unauthorized charges made with your credit card. If you see an unauthorized charge, tell us immediately by calling the number on the back of your card or billing statement.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">How We Protect You</h2>
          <div className="space-y-3">
            {protectionFeatures.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-primary-700" />
            <h2 className="font-semibold text-primary-900">2-Step Verification</h2>
          </div>
          <p className="text-sm text-primary-800 leading-relaxed mb-3">
            Give your account an extra layer of protection with 2-step verification. Sign up for extra security when you sign in to chase.com. You'll be asked to confirm your identity with additional verification methods.
          </p>
          <Link
            to="/security"
            className="inline-block bg-primary-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary-700 transition-colors"
          >
            Manage security settings
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Chase Mobile App Security</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[
              { icon: Eye, text: 'Monitor transactions on-the-go for unusual activity' },
              { icon: Bell, text: 'Customize alerts to easily monitor your account activity' },
              { icon: Shield, text: 'Credit and identity monitoring with Credit Journey' },
              { icon: Smartphone, text: 'Lock your card right from your phone if it goes missing' },
              { icon: Users, text: 'Send money without sharing your account info using Zelle' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 ${i < 4 ? 'border-b border-gray-100' : ''}`}>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary-600" />
                </div>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 text-sm mb-1">How You Pay Matters</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                If you have an issue or suspect fraud on a purchase with a Chase credit or debit card, usually we can just cancel your card and send you a new one. If the purchase was made directly from your checking or savings account (ACH payment), it may require closing your account and opening a new one.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Security Resources</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {securityLinks.map((link, i) => (
              <button
                key={i}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left ${
                  i < securityLinks.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{link.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{link.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            "Chase," "JPMorgan," "JPMorgan Chase," the JPMorgan Chase logo and the Octagon Symbol are trademarks of JPMorgan Chase Bank, N.A. JPMorgan Chase Bank, N.A. is a wholly-owned subsidiary of JPMorgan Chase & Co.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} JPMorgan Chase & Co.
          </p>
        </div>
      </div>
    </div>
  );
}
