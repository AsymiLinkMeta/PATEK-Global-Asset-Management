import { ArrowLeft, Accessibility as AccessibilityIcon, Phone, Mail, Monitor, Smartphone, Headphones, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/profile" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Accessibility</h1>
        </div>
        <p className="text-sm text-blue-100">Our commitment to accessible banking</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div className="bg-gradient-to-br from-primary-600 to-[#005EB8] rounded-xl p-5 text-white">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AccessibilityIcon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-1">Banking for Everyone</h2>
              <p className="text-sm text-blue-100 leading-relaxed">
                Chase is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We aim to comply with all applicable standards, including WCAG 2.1 Level AA.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Our Accessibility Commitment</h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              JPMorgan Chase is committed to ensuring that its website is accessible to people with disabilities. All the pages on our website will meet W3C WAI's Web Content Accessibility Guidelines 2.1, Level A and AA conformance, or updated equivalents of these guidelines.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              We continue to test and make every effort to keep our site ahead of accessibility advancements. Any issues should be reported to us so they can be corrected promptly.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Accessible Features</h2>
          <div className="space-y-3">
            {[
              {
                icon: Monitor,
                title: 'Screen Reader Compatible',
                description: 'Our website and mobile app are designed to work with popular screen readers including JAWS, NVDA, VoiceOver, and TalkBack.'
              },
              {
                icon: Eye,
                title: 'Visual Accommodations',
                description: 'We support text resizing, high contrast modes, and ensure sufficient color contrast ratios throughout our digital experiences.'
              },
              {
                icon: Smartphone,
                title: 'Mobile Accessibility',
                description: 'The Chase Mobile app includes built-in accessibility features, including support for device-level assistive technologies and adjustable text sizes.'
              },
              {
                icon: Headphones,
                title: 'Alternative Formats',
                description: 'Statements and documents are available in alternative formats including Braille, large print, and audio upon request.'
              }
            ].map((feature, i) => (
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

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">ATM Accessibility</h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              Chase ATMs are designed to be accessible to customers with disabilities. Features include:
            </p>
            <ul className="space-y-2">
              {[
                'Audio-guided transactions through headphone jack',
                'Tactile keypads with Braille markings',
                'Wheelchair-accessible height and reach requirements',
                'High contrast screens with adjustable font sizes',
                'Support for screen reader technology'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Branch Accessibility</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Chase branches are designed to be accessible and welcoming. Our branches include wheelchair-accessible entrances, accessible transaction counters, and assistive listening devices upon request.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Service animals are welcome in all Chase branches. If you need any accommodations when visiting a branch, please contact us in advance so we can ensure your visit goes smoothly.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Communication Preferences</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            We offer multiple ways to communicate with us based on your preferences:
          </p>
          <ul className="space-y-2">
            {[
              'TTY/TDD services for deaf and hard-of-hearing customers',
              'Relay services including Video Relay Service (VRS)',
              'Large print and Braille statements upon request',
              'Audio format documents available',
              'Closed captioning on video content'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
          <h2 className="font-semibold text-primary-900 mb-3">Contact Us About Accessibility</h2>
          <p className="text-sm text-primary-800 leading-relaxed mb-4">
            If you experience any difficulty accessing any part of our website or need assistance with our products and services, please contact us:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-900">1-800-935-9935</p>
                <p className="text-xs text-primary-700">General customer service</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-900">1-800-242-7383</p>
                <p className="text-xs text-primary-700">TTY/TDD services</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-900">accessibility@chase.com</p>
                <p className="text-xs text-primary-700">Email accessibility team</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            "Chase," "JPMorgan," "JPMorgan Chase," the JPMorgan Chase logo and the Octagon Symbol are trademarks of JPMorgan Chase Bank, N.A. JPMorgan Chase Bank, N.A. is a wholly-owned subsidiary of JPMorgan Chase & Co.
          </p>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            JPMorgan Chase Bank, N.A. Member FDIC. Equal Housing Lender.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} JPMorgan Chase & Co.
          </p>
        </div>
      </div>
    </div>
  );
}
