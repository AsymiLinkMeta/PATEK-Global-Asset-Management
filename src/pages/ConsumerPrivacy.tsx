import { ArrowLeft, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface SharingRow {
  reason: string;
  doesShare: boolean;
  canLimit: boolean;
}

const sharingData: SharingRow[] = [
  { reason: 'For our everyday business purposes - such as to process your transactions, maintain your account(s), respond to court orders and legal investigations, or report to credit bureaus', doesShare: true, canLimit: false },
  { reason: 'For our marketing purposes - to offer our products and services to you', doesShare: true, canLimit: false },
  { reason: 'For joint marketing with other financial companies', doesShare: true, canLimit: false },
  { reason: "For our affiliates' everyday business purposes - information about your transactions and experiences", doesShare: true, canLimit: false },
  { reason: "For our affiliates' everyday business purposes - information about your creditworthiness", doesShare: true, canLimit: true },
  { reason: 'For our affiliates to market to you', doesShare: true, canLimit: true },
  { reason: 'For nonaffiliates to market to you', doesShare: true, canLimit: true },
];

export default function ConsumerPrivacy() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">U.S. Consumer Privacy Notice</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-primary-600 text-white p-4">
            <h2 className="font-bold text-lg">FACTS</h2>
            <p className="text-sm text-blue-100 mt-1">What does Chase do with your personal information?</p>
          </div>

          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">Why?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Financial companies choose how they share your personal information. Federal law gives consumers the right to limit some but not all sharing. Federal law also requires us to tell you how we collect, share, and protect your personal information. Please read this notice carefully to understand what we do.
            </p>
          </div>

          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">What?</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              The types of personal information we collect and share depend on the product or service you have with us. This information can include:
            </p>
            <ul className="space-y-1">
              {['Social Security number and income', 'Account balances and transaction history', 'Credit history and payment history'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">How?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All financial companies need to share customers' personal information to run their everyday business. In the section below, we list the reasons financial companies can share their customers' personal information; the reasons Chase chooses to share; and whether you can limit this sharing.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <p className="text-xs font-bold text-gray-700 uppercase">Reasons we can share</p>
              </div>
              <div className="col-span-3 text-center">
                <p className="text-xs font-bold text-gray-700 uppercase">Does Chase share?</p>
              </div>
              <div className="col-span-3 text-center">
                <p className="text-xs font-bold text-gray-700 uppercase">Can you limit?</p>
              </div>
            </div>
          </div>
          {sharingData.map((row, i) => (
            <div key={i} className={`grid grid-cols-12 gap-2 p-4 items-start ${i < sharingData.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="col-span-6">
                <p className="text-xs text-gray-600 leading-relaxed">{row.reason}</p>
              </div>
              <div className="col-span-3 text-center">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${row.doesShare ? 'bg-blue-50 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>
                  {row.doesShare ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="col-span-3 text-center">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${row.canLimit ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {row.canLimit ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <h3 className="font-semibold text-primary-900 text-sm mb-2">To limit our sharing</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-900">Call 1-888-868-8618</p>
              <p className="text-xs text-primary-700">Our menu will prompt you through your choice(s)</p>
            </div>
          </div>
          <p className="text-xs text-primary-700 leading-relaxed">
            If you are a new customer, we can begin sharing your information 30 days from the date we sent this notice. When you are no longer our customer, we continue to share your information as described in this notice. However, you can contact us at any time to limit our sharing.
          </p>
        </div>

        <Accordion
          title="Who we are"
          isOpen={expandedSection === 'who'}
          onToggle={() => toggle('who')}
        >
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-1">Who is providing this notice?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              The U.S. consumer financial companies within the JPMorgan Chase family, including JPMorgan Chase Bank, N.A., Chase Insurance Agency, Inc., J.P. Morgan Securities LLC, The Infatuation Inc. and the Frosch family of companies, except where a JPMorgan Chase company issues a separate notice.
            </p>
          </div>
        </Accordion>

        <Accordion
          title="What we do"
          isOpen={expandedSection === 'what'}
          onToggle={() => toggle('what')}
        >
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">How does Chase protect my personal information?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                To protect your personal information from unauthorized access and use, we use security measures that comply with federal law. These measures include computer safeguards and secured files and buildings. We authorize our employees to get your information only when they need it to do their work, and we require companies that work for us to protect your information.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">How does Chase collect my personal information?</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">We collect your personal information, for example, when you:</p>
              <ul className="space-y-1">
                {[
                  'Open an account or make deposits or withdrawals from your account',
                  'Pay your bills or apply for a loan',
                  'Use your credit or debit card'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
                We also collect your personal information from others, such as credit bureaus, affiliates, or other companies.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Why can't I limit all sharing?</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">Federal law gives you the right to limit only:</p>
              <ul className="space-y-1">
                {[
                  "Sharing for affiliates' everyday business purposes - information about your creditworthiness",
                  'Affiliates from using your information to market to you',
                  'Sharing for nonaffiliates to market to you'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
                State laws and individual companies may give you additional rights to limit sharing.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Definitions"
          isOpen={expandedSection === 'definitions'}
          onToggle={() => toggle('definitions')}
        >
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Affiliates</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Companies related by common ownership or control. They can be financial and nonfinancial companies. Our affiliates include companies with a Chase or J.P. Morgan name and financial companies such as J.P. Morgan Securities LLC.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Nonaffiliates</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Companies not related by common ownership or control. They can be financial and non-financial companies. Nonaffiliates we share with can include companies such as retailers, auto dealers, auto makers and membership clubs.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Joint Marketing</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                A formal agreement between nonaffiliated financial companies that together market financial products or services to you. Our joint marketing partners include categories of companies such as insurance companies.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Other important information"
          isOpen={expandedSection === 'other'}
          onToggle={() => toggle('other')}
        >
          <div className="p-4 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-gray-700">VT:</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Accounts with a Vermont mailing address are automatically treated as if they have limited the sharing as described above. For joint marketing, we will only disclose your name, contact information and information about your transactions.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-700">NV:</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We are providing you this notice pursuant to Nevada law. If you prefer not to receive marketing calls from us, you may be placed on our Internal Do Not Call List by calling 1-800-945-9470, or by writing to us at P.O. Box 734007, Dallas, TX 75373-4007.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-700">CA:</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Accounts with a California mailing address are automatically treated as if they have limited the sharing with nonaffiliates as described above. CA residents are provided a CA notice for additional choices.
              </p>
            </div>
          </div>
        </Accordion>

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

function Accordion({ title, isOpen, onToggle, children }: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="border-t border-gray-200">{children}</div>}
    </div>
  );
}
