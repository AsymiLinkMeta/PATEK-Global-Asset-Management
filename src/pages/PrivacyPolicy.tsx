import { ArrowLeft, Shield, Eye, Database, Share2, Cookie, Globe, Lock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Online Privacy Policy</h1>
        </div>
        <p className="text-sm text-blue-100">Last updated: September 2023</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">Your Privacy Matters</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your privacy is important to us. This Online Privacy Policy explains how we collect, share, use, and protect information when you visit or use our online services and any other online services offered by the U.S. and Canada banking and non-banking affiliates and subsidiaries of Chase that link to or reference this policy.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">General Principles</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">Our online services are intended for a U.S. and Canadian audience. If you visit one of these services, your information may be transferred or processed in the United States.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">Our online services are not intended for children under 13. We do not knowingly collect personal information from children under 13 without parental consent.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">If you are a U.S. consumer with a financial product or service with us, we will use and share information in accordance with our U.S. Consumer Privacy Notice.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">If you are a California resident, you may have rights under the California Consumer Privacy Act (CCPA).</p>
            </li>
          </ul>
        </div>

        <Section
          icon={<Database className="w-5 h-5 text-primary-600" />}
          title="Information We Collect"
          subsections={[
            {
              subtitle: 'Personal Information',
              content: 'When you visit or use our online services, we may collect personal information from or about you including your name, email address, mailing address, telephone number(s), account numbers, limited location information, user name and password. We may also collect payment card information, tax identification numbers, and driver\'s license numbers when you provide such information while using our online services and where we believe it is reasonably required for ordinary business purposes.'
            },
            {
              subtitle: 'Usage and Other Information',
              content: 'We may capture the IP address of the device you use to connect to the online service, the type of operating system and browser you use, and information about the site you came from, the parts of our online service you access, and the site you visit next. We or our third-party partners may also use cookies, web beacons or other technologies to collect and store other information about your visit to, or use of, our online services.'
            },
            {
              subtitle: 'Chase Mobile',
              content: 'When you interact with us through Chase Mobile, we may collect information such as unique device identifiers for your mobile device, your screen resolution and other device settings, information about your location, and analytical information about how you use your mobile device. We may ask your permission before collecting certain information (such as precise geo-location information) through Chase Mobile.'
            },
            {
              subtitle: 'Additional Sources',
              content: 'We may also collect information about you from additional online and offline sources including from co-branded partner sites or commercially available third-party sources, such as credit reporting agencies. We may combine this information with the personal and other information we have collected about you under this Online Privacy Policy.'
            }
          ]}
        />

        <Section
          icon={<Eye className="w-5 h-5 text-primary-600" />}
          title="Use of Information"
          items={[
            'Processing applications and transactions',
            'Verifying your identity (such as when you access your account information)',
            'Preventing fraud and enhancing the security of your account or our online services',
            'Responding to your requests and communicating with you',
            'Managing your preferences',
            'Performing analytics concerning your use of our online services, including your responses to our emails and the pages and advertisements you view',
            'Providing you tailored content and marketing messages',
            'Operating, evaluating and improving our business (including developing new products and services; improving existing products and services; performing data analytics; and performing accounting, auditing and other internal functions)',
            'Complying with and enforcing applicable legal requirements, relevant industry standards, contractual obligations and our policies'
          ]}
        />

        <Section
          icon={<Share2 className="w-5 h-5 text-primary-600" />}
          title="Disclosure of Information"
          items={[
            'Chase third-party service providers',
            'Chase affiliated websites and businesses in an effort to bring you improved service across our family of products and services, when permissible under relevant laws and regulations',
            'Other companies to bring you co-branded services, products or programs that you have requested',
            'Third parties or affiliates in connection with a corporate transaction, such as a sale, consolidation or merger of Chase businesses',
            'Other third parties to comply with legal requirements such as the demands of applicable subpoenas and court orders; to verify or enforce our terms of use, our other rights, or other applicable policies; to address fraud, security or technical issues; to respond to an emergency; or otherwise to protect the rights, property or security of our customers or third parties'
          ]}
        />

        <Section
          icon={<Cookie className="w-5 h-5 text-primary-600" />}
          title="Cookies & Tracking Technologies"
          subsections={[
            {
              subtitle: 'Cookies',
              content: 'Cookies are small amounts of data a website can send to a visitor\'s web browser. They are often stored on the device you are using to help track your areas of interest. Cookies may also enable us or our service providers to relate your use of our online services over time to customize your experience. Most web browsers allow you to adjust your browser settings to decline or delete cookies, but doing so may degrade your experience with our online services.'
            },
            {
              subtitle: 'Web Beacons',
              content: 'Clear GIFs, pixel tags or web beacons — which are typically one-pixel, transparent images located on a webpage or in an email or other message — may be used on our sites and in some of our digital communications. These are principally used to help recognize users, assess traffic patterns and measure site or campaign engagement.'
            },
            {
              subtitle: 'Local Shared Objects',
              content: 'Sometimes referred to as "flash cookies," these may be stored on your hard drive using a media player or other software installed on your device. Local Shared Objects are similar to cookies in terms of their operation, but may not be managed in your browser in the same way.'
            }
          ]}
        />

        <Section
          icon={<Globe className="w-5 h-5 text-primary-600" />}
          title="Online Advertising"
          subsections={[
            {
              subtitle: 'Interest-Based Advertising',
              content: 'You will see advertisements when you use many of our online services. Which advertisements you see is often determined using the information we or our affiliates, service providers and other companies that we work with have about you, including information about your relationships with us (e.g., types of accounts held, transactional information, location of banking activity).'
            },
            {
              subtitle: 'Opting Out of OBA',
              content: 'You can opt out of Online Behavioral Advertising (OBA) through the cross-industry Self-Regulatory Program managed by the Digital Advertising Alliance (DAA) at youradchoices.com. Another way is by clicking on the Advertising Options Icon featured on certain Chase ads on third-party websites. Bear in mind that because cookies are stored by your browser, if you use different browsers, you will need to opt out from each browser.'
            }
          ]}
        />

        <Section
          icon={<Lock className="w-5 h-5 text-primary-600" />}
          title="Security"
          subsections={[
            {
              subtitle: 'How We Protect You',
              content: 'We use reasonable physical, electronic, and procedural safeguards that comply with legal and regulatory standards to protect and limit access to personal information. This includes device safeguards and secured files and buildings.'
            },
            {
              subtitle: 'Important Note',
              content: 'Information you send to us electronically may not be secure when it is transmitted to us. We recommend that you do not use unsecure channels to communicate sensitive or confidential information (such as your tax identification number) to us.'
            }
          ]}
        />

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Changes to This Policy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We may change this Online Privacy Policy from time to time. When we do, we will let you know by appropriate means such as by posting the revised policy on this page with a new "Last Updated" date. Any changes to this Online Privacy Policy will become effective when posted unless indicated otherwise.
              </p>
            </div>
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

function Section({ icon, title, items, subsections }: {
  icon: React.ReactNode;
  title: string;
  items?: string[];
  subsections?: { subtitle: string; content: string }[];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {subsections && subsections.map((sub, i) => (
        <div key={i} className={i > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}>
          <h4 className="text-sm font-medium text-gray-800 mb-1">{sub.subtitle}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{sub.content}</p>
        </div>
      ))}
      {items && (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
