import { ArrowLeft, Bell, Info, AlertTriangle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead } = useData();

  const sortedNotifs = [...notifications].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const unread = sortedNotifs.filter(n => !n.is_read);
  const read = sortedNotifs.filter(n => n.is_read);

  const getIcon = (type: string) => {
    if (type === 'warning') return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <Info className="w-5 h-5 text-[#0060f0]" />;
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 flex-1">Notifications</h1>
          <Bell className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="px-6 py-4">
        {unread.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">New</h2>
            <div className="space-y-2">
              {unread.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className="w-full text-left bg-blue-50 border border-blue-100 rounded-xl p-4 hover:bg-blue-100/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">{getIcon(n.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{n.title}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{n.message}</p>
                      <p className="text-[11px] text-gray-400 mt-1.5">{formatTime(n.created_at)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {read.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Earlier</h2>
            <div className="space-y-2">
              {read.map((n) => (
                <div key={n.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Check className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 mb-0.5">{n.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{n.message}</p>
                      <p className="text-[11px] text-gray-400 mt-1.5">{formatTime(n.created_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
