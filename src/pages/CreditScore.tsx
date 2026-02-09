import { ArrowLeft, Star, MoreHorizontal, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreditScore() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'credit' | 'alerts' | 'offers'>('credit');

  return (
    <div className="min-h-screen bg-[#003e7e] pb-0">
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-medium text-white flex-1">Chase Credit Journey</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MoreHorizontal className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('credit')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'credit'
                ? 'bg-white text-[#003e7e] border-2 border-white'
                : 'text-white border-2 border-white/50'
            }`}
          >
            Credit
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'alerts'
                ? 'bg-white text-[#003e7e] border-2 border-white'
                : 'text-white border-2 border-white/50'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors relative ${
              activeTab === 'offers'
                ? 'bg-white text-[#003e7e] border-2 border-white'
                : 'text-white border-2 border-white/50'
            }`}
          >
            Offers
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
              <Star className="w-3 h-3 text-[#0066cc] fill-[#0066cc]" />
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-white/80 text-sm">As of 11/02/25</p>
          <button className="flex items-center gap-0.5 text-white/80 text-sm hover:text-white transition-colors">
            See score history
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-4" style={{ marginTop: '20px' }}>
          <p className="text-white text-xl mb-4">Excellent</p>

          <div className="relative w-full max-w-md h-56">
            <svg viewBox="0 0 240 140" className="w-full h-full -mt-8">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
                  <stop offset="35%" style={{ stopColor: '#ffa500', stopOpacity: 1 }} />
                  <stop offset="65%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              <path
                d="M 40 110 A 80 80 0 0 1 200 110"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              <path
                d="M 40 110 A 80 80 0 0 1 200 110"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="250"
                strokeDashoffset="30"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
              <p className="text-white font-bold leading-none mb-1" style={{ fontSize: '5.4rem' }}>823</p>
              <p className="text-white/90 text-sm">No Change</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 text-white/70 text-xs mt-2">
            <span>VantageScore® 3.0 provided by Experian™</span>
            <button className="hover:bg-white/10 rounded-full p-0.5">
              <div className="w-4 h-4 border border-white/70 rounded-full flex items-center justify-center">
                <span className="text-white/70 text-[10px] font-semibold">?</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0ea5cd] px-6 py-10">
        <div className="text-white text-4xl font-bold">CreditWise®</div>
      </div>

      <div className="bg-white pt-12 pb-16">
        <div className="px-6">
          <div className="flex items-center justify-center gap-2 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">FICO® SCORE 8</h2>
            <button className="hover:bg-gray-100 rounded-full transition-colors">
              <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
            </button>
          </div>

          <div className="text-center mb-12">
            <p className="text-2xl font-semibold text-gray-700 mb-8">Exceptional</p>
            <div className="w-full bg-gray-200 h-2">
              <div className="bg-green-600 h-2" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-bold text-gray-900 leading-none mb-6" style={{ fontSize: '8rem' }}>841</p>
            <p className="text-gray-600 text-base">Updated on November 7, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
