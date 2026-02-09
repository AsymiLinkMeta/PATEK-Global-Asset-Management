import { useState } from 'react';
import { ArrowLeft, Search, Phone, MessageCircle, MapPin, ChevronRight, ChevronDown, ChevronUp, CreditCard, Wallet, Send, Shield, Smartphone, FileText, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const quickActions = [
  { icon: CreditCard, label: 'Report lost/stolen card', to: '/card-controls' },
  { icon: Send, label: 'Send with Zelle', to: '/zelle' },
  { icon: Shield, label: 'Dispute a charge', to: '/transactions' },
  { icon: FileText, label: 'View statements', to: '/statements' },
  { icon: Wallet, label: 'Account details', to: '/accounts' },
  { icon: Smartphone, label: 'Update contact info', to: '/personal-details' },
];

const categories = [
  {
    title: 'Account Management',
    faqs: [
      { question: 'How do I change my address?', answer: 'You can update your address by going to Profile > Personal Details. You can also call us at 1-800-935-9935 or visit any Chase branch.' },
      { question: 'How do I set up direct deposit?', answer: 'To set up direct deposit, provide your employer with your Chase routing number (found on your statements or in Account Details) and your account number. You can find both in the Chase app under Account Details.' },
      { question: 'How do I order checks?', answer: 'You can order checks through the Chase app or chase.com. Go to your checking account, then select "Order checks." You can also call us or visit a branch.' },
      { question: 'How do I close my account?', answer: 'To close your account, please visit a Chase branch or call customer service at 1-800-935-9935. Make sure to transfer any remaining balance before closing.' },
    ]
  },
  {
    title: 'Payments & Transfers',
    faqs: [
      { question: 'What is my daily Zelle limit?', answer: 'The daily send limit for Zelle is $5,000 per day and $40,000 per month for most Chase checking accounts. Chase Private Client accounts may have higher limits.' },
      { question: 'How long do wire transfers take?', answer: 'Domestic wires submitted before 4:00 PM ET on a business day are typically processed the same day. International wires take 1-5 business days depending on the destination country.' },
      { question: 'Can I cancel a pending payment?', answer: 'If a Zelle payment is still pending (recipient hasn\'t enrolled), you can cancel it in the Activity section. Once a payment has been sent, it cannot be reversed. For bill payments, you may be able to cancel if the payment hasn\'t been processed yet.' },
      { question: 'What are the wire transfer fees?', answer: 'Domestic wire transfers cost $25 per wire. International wires cost $45 per outgoing wire. Incoming domestic wires are $15, and incoming international wires are free.' },
    ]
  },
  {
    title: 'Cards & Security',
    faqs: [
      { question: 'How do I lock my card?', answer: 'You can lock your debit or credit card instantly through the Chase app. Go to Card Controls, select your card, and toggle the lock switch. You can also call 1-800-935-9935.' },
      { question: 'How do I dispute a charge?', answer: 'In the Chase app, find the transaction you want to dispute, tap on it, and select "Report a problem." Follow the prompts to submit your dispute. You can also call the number on the back of your card.' },
      { question: 'How do I report fraud?', answer: 'If you suspect fraud on your account, call us immediately at 1-800-935-9935 for personal accounts or 1-888-886-8869 for business accounts. You can also report fraud through the Chase app or at chase.com/report-fraud.' },
      { question: 'What is Chase\'s Zero Liability Protection?', answer: 'Zero Liability Protection means you won\'t be held responsible for unauthorized charges made with your Chase credit card. If you notice an unauthorized charge, contact us immediately.' },
    ]
  },
  {
    title: 'Digital Banking',
    faqs: [
      { question: 'How do I reset my password?', answer: 'On the Chase login page, click "Forgot username/password?" and follow the prompts. You\'ll need to verify your identity using your account information and a verification code sent to your phone or email.' },
      { question: 'How do I set up Touch ID or Face ID?', answer: 'Open the Chase app, go to Profile > Security, and enable biometric login. Make sure biometric features are enabled in your device settings first.' },
      { question: 'Is the Chase app secure?', answer: 'Yes. The Chase app uses multiple layers of security including data encryption, biometric authentication, two-factor verification, and continuous fraud monitoring. We also support device-level security features.' },
      { question: 'How do I enable push notifications?', answer: 'Go to Profile > Notifications in the Chase app, and customize which alerts you\'d like to receive. Make sure notifications are also enabled for Chase in your device settings.' },
    ]
  }
];

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const allFAQs = categories.flatMap((cat, catIdx) =>
    cat.faqs.map((faq, faqIdx) => ({ ...faq, category: cat.title, key: `${catIdx}-${faqIdx}` }))
  );

  const searchResults = searchQuery.length > 2
    ? allFAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Help & Support</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full pl-10 pr-4 py-3 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {searchQuery.length > 2 ? (
          <div>
            <p className="text-sm text-gray-500 mb-3">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found</p>
            {searchResults.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No results found. Try a different search or contact us.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map(faq => (
                  <div key={faq.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.key ? null : faq.key)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex-1">
                        <p className="text-xs text-primary-600 font-medium mb-0.5">{faq.category}</p>
                        <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                      </div>
                      {expandedFAQ === faq.key ? (
                        <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                      )}
                    </button>
                    {expandedFAQ === faq.key && (
                      <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-3">
                {quickActions.map((action, i) => (
                  <Link
                    key={i}
                    to={action.to}
                    className="bg-white rounded-xl border border-gray-200 p-3 text-center hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <action.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-700 leading-tight">{action.label}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Browse Topics</h2>
              <div className="space-y-2">
                {categories.map((category, catIdx) => (
                  <div key={catIdx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === catIdx ? null : catIdx)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-sm font-semibold text-gray-900">{category.title}</h3>
                      {expandedCategory === catIdx ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedCategory === catIdx && (
                      <div className="border-t border-gray-200">
                        {category.faqs.map((faq, faqIdx) => {
                          const key = `${catIdx}-${faqIdx}`;
                          return (
                            <div key={faqIdx} className={faqIdx < category.faqs.length - 1 ? 'border-b border-gray-100' : ''}>
                              <button
                                onClick={() => setExpandedFAQ(expandedFAQ === key ? null : key)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                              >
                                <p className="text-sm text-gray-700 flex-1">{faq.question}</p>
                                {expandedFAQ === key ? (
                                  <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                                )}
                              </button>
                              {expandedFAQ === key && (
                                <div className="px-4 pb-4">
                                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Contact Us</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Call us</p>
                  <p className="text-xs text-gray-500">1-800-935-9935</p>
                  <p className="text-xs text-gray-400">Available 24/7</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Secure message</p>
                  <p className="text-xs text-gray-500">Send us a message through the app</p>
                  <p className="text-xs text-gray-400">Response within 1 business day</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <Link
              to="/atm-locator"
              className="block bg-white rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Find a branch or ATM</p>
                  <p className="text-xs text-gray-500">15,000+ ATMs & 4,700+ branches</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            For fraud or security emergencies, call 1-800-935-9935 immediately. Available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}
