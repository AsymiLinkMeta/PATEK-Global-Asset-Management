import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

export default function PersonalDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setProfile({
        full_name: data.full_name || '',
        email: data.email || user.email || '',
        phone: data.phone || '',
        date_of_birth: data.date_of_birth || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zip_code: data.zip_code || '',
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        date_of_birth: profile.date_of_birth || null,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        zip_code: profile.zip_code,
      })
      .eq('id', user.id);

    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const fields = [
    { key: 'full_name' as const, label: 'Full Name', icon: User, type: 'text' },
    { key: 'email' as const, label: 'Email', icon: Mail, type: 'email', readOnly: true },
    { key: 'phone' as const, label: 'Phone', icon: Phone, type: 'tel' },
    { key: 'date_of_birth' as const, label: 'Date of Birth', icon: Calendar, type: 'date' },
    { key: 'address' as const, label: 'Address', icon: MapPin, type: 'text' },
    { key: 'city' as const, label: 'City', icon: MapPin, type: 'text' },
    { key: 'state' as const, label: 'State', icon: MapPin, type: 'text' },
    { key: 'zip_code' as const, label: 'ZIP Code', icon: MapPin, type: 'text' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 flex-1">Personal Details</h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="text-primary-600 font-medium text-sm"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => { setEditing(false); loadProfile(); }}
              className="text-gray-600 font-medium text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="px-6 py-6">
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">Profile updated successfully</p>
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-gray-500" strokeWidth={1.5} />
          </div>
          <p className="text-lg font-semibold text-gray-900">{profile.full_name || 'Your Name'}</p>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        <div className="space-y-4">
          {fields.map((field) => {
            const IconComponent = field.icon;
            const isReadOnly = 'readOnly' in field && field.readOnly;

            return (
              <div key={field.key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-4 h-4 text-gray-400" />
                  <label className="text-sm font-medium text-gray-500">{field.label}</label>
                </div>
                {editing && !isReadOnly ? (
                  <input
                    type={field.type}
                    value={profile[field.key]}
                    onChange={(e) => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                ) : (
                  <p className={`text-gray-900 pl-7 ${!profile[field.key] ? 'text-gray-400 italic' : ''}`}>
                    {profile[field.key] || 'Not set'}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {editing && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
    </div>
  );
}
