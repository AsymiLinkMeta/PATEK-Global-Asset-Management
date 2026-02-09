import { ArrowLeft, Star, MoreHorizontal, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreditScore() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'credit' | 'alerts' | 'offers'>('credit');

  return (
    <div className="min-h-screen bg-[#003e7e]">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold text-white flex-1">Chase Credit Journey</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MoreHorizontal className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab('credit')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'credit'
                ? 'bg-white text-[#003e7e] border-2 border-white'
                : 'text-white border-2 border-white/40'
            }`}
          >
            Credit
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'alerts'
                ? 'bg-white text-[#003e7e] border-2 border-white'
                : 'text-white border-2 border-white/40'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-6 py-2 rounded-full font-medium transition-colors relative ${
              activeTab === 'offers'
                ? 'bg-white text-[#003e7e] border-2 border-white'
                : 'text-white border-2 border-white/40'
            }`}
          >
            Offers
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
              <Star className="w-3 h-3 text-[#003e7e] fill-[#003e7e]" />
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-white/90 text-sm">As of 11/02/25</p>
          <button className="flex items-center gap-1 text-white/90 text-sm hover:text-white transition-colors">
            See score history
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <p className="text-white text-lg mb-4">Excellent</p>

          <div className="relative w-72 h-56 mb-4">
            <svg viewBox="0 0 200 120" className="w-full h-full">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
                  <stop offset="40%" style={{ stopColor: '#ffa500', stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              <path
                d="M 30 100 A 70 70 0 0 1 170 100"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="12"
                strokeLinecap="round"
              />

              <path
                d="M 30 100 A 70 70 0 0 1 170 100"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="220"
                strokeDashoffset="30"
              />
            </svg>

            <div className="absolute top-0 right-8 flex flex-col items-end gap-3 text-white/70 text-xs font-medium">
              <div>660</div>
              <div>720</div>
              <div>780</div>
              <div>850</div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <p className="text-white text-7xl font-bold mb-1">823</p>
              <p className="text-white/80 text-sm">No Change</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-white/70 text-xs">
            <span>VantageScore® 3.0 provided by Experian™</span>
            <button className="hover:bg-white/10 rounded-full p-1">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0d8bb5] px-6 py-8">
        <div className="text-white text-4xl font-bold mb-2">CreditWise®</div>
      </div>

      <div className="bg-white rounded-t-3xl pt-8 pb-12">
        <div className="px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">FICO® SCORE 8</h2>
            <button className="hover:bg-gray-100 rounded-full p-1">
              <HelpCircle className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="text-center mb-4">
            <p className="text-xl font-semibold text-gray-700 mb-4">Exceptional</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-8xl font-bold text-gray-900 mb-4">841</p>
            <p className="text-gray-600">Updated on November 7, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
