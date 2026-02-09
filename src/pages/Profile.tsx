import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Shield, Lock, Building2, Bell, MessageSquare, FileText, ChevronRight, ArrowLeft, CreditCard, BarChart3 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('');
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();
      if (data?.full_name) setProfileName(data.full_name);

      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
      if (count) setNotifCount(count);
    })();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const formatLastSignIn = () => {
    const today = new Date();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(today);
  };

  const menuItems = [
    { id: 'security', icon: Shield, label: 'Security & privacy', route: '/security' },
    { id: 'personal', icon: User, label: 'Personal details', route: '/personal-details' },
    { id: 'cards', icon: CreditCard, label: 'Card controls', route: '/card-controls' },
    { id: 'spending', icon: BarChart3, label: 'Spending insights', route: '/spending-insights' },
    { id: 'alerts', icon: Bell, label: 'Alerts & messages', route: '/notifications', badge: notifCount },
    { id: 'signin', icon: Lock, label: 'Sign-in preferences', route: '/security' },
    { id: 'account', icon: Building2, label: 'Account settings', route: '/accounts' },
    { id: 'help', icon: MessageSquare, label: 'Help & support' },
    { id: 'documents', icon: FileText, label: 'Document manager' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={handleSignOut}
          className="text-blue-600 font-medium text-sm"
        >
          SIGN OUT
        </button>
      </div>

      <div className="px-6 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile & Settings</h1>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
          </div>
          <div>
            {profileName && <p className="font-semibold text-gray-900 text-lg">{profileName}</p>}
            <button className="flex items-center gap-2 text-gray-700">
              <span className="text-sm">Last sign in: {formatLastSignIn()}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => {
            const content = (
              <div className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                  <span className="text-base font-normal text-gray-900">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            );

            if (item.route) {
              return (
                <Link key={item.id} to={item.route} className="block">
                  {content}
                </Link>
              );
            }

            return (
              <button key={item.id} className="w-full text-left">
                {content}
              </button>
            );
          })}
        </div>

        <div className="mt-8 mb-6 flex items-center justify-between">
          <button className="text-blue-600 font-normal text-base flex items-center gap-1">
            Give us feedback
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="text-blue-600 font-normal text-base flex items-center gap-1">
            Legal Information
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
