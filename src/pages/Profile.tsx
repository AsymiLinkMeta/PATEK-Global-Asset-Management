import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Shield, Lock, Building2, Bell, MessageSquare, FileText, ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

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
    {
      id: 'security',
      icon: Shield,
      label: 'Security & privacy',
      hasSubmenu: true,
    },
    {
      id: 'personal',
      icon: User,
      label: 'Personal details',
      hasSubmenu: false,
    },
    {
      id: 'signin',
      icon: Lock,
      label: 'Sign-in preferences',
      hasSubmenu: false,
    },
    {
      id: 'account',
      icon: Building2,
      label: 'Account settings',
      hasSubmenu: false,
    },
    {
      id: 'alerts',
      icon: Bell,
      label: 'Alerts & messages',
      hasSubmenu: false,
    },
    {
      id: 'help',
      icon: MessageSquare,
      label: 'Help & support',
      hasSubmenu: false,
    },
    {
      id: 'documents',
      icon: FileText,
      label: 'Document manager',
      hasSubmenu: false,
    },
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
          <button className="flex items-center gap-2 text-gray-700">
            <span className="text-base">Last sign in: {formatLastSignIn()}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.hasSubmenu && toggleSection(item.id)}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="text-base font-normal text-gray-900">{item.label}</span>
              </div>
              {item.hasSubmenu ? (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
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
