import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-tech-dark text-tech-gray-light">
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-tech-darker to-tech-dark">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-accent mb-6">
            Contact PATEK Global
          </h1>
          <p className="text-2xl md:text-3xl text-tech-blue-light mb-8">
            Internal Inquiries Only
          </p>
          <p className="text-xl text-tech-gray-light max-w-4xl mx-auto leading-relaxed">
            This contact form is exclusively for authorized personnel from PATEK Global parent companies and subsidiaries.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-dark">
        <div className="max-w-4xl mx-auto">
          <div className="bg-tech-darker border-2 border-yellow-500 p-8 mb-12">
            <div className="flex items-start">
              <AlertCircle className="h-8 w-8 text-yellow-400 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Access Restriction Notice
                </h2>
                <div className="space-y-3 text-tech-gray-light">
                  <p className="leading-relaxed">
                    This contact form requires authentication and is accessible only to authorized personnel within the PATEK Global corporate family.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-tech-blue-light">Public inquiries are not accepted.</strong> If you believe you need access but are unable to submit the form, please contact your parent company administrator.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-tech-darker p-8 border border-tech-blue-dark">
            <h2 className="text-3xl font-bold text-tech-accent mb-6 text-center">
              Internal Inquiry Form
            </h2>
            <p className="text-tech-gray-light mb-8 text-center">
              For authorized personnel only. All submissions are logged and monitored.
            </p>
            <ContactForm />
          </div>

          <div className="mt-12 bg-tech-darker p-8 border border-tech-blue-dark">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-tech-accent mr-3" />
              <h3 className="text-xl font-bold text-tech-blue-light">Alternative Contact</h3>
            </div>
            <p className="text-tech-gray-light text-center">
              For urgent matters, authorized personnel may contact: <br />
              <a href="mailto:inquiries@patekglobal.com" className="text-tech-accent hover:text-tech-blue-light transition-colors duration-300">
                inquiries@patekglobal.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-darker border-t border-tech-blue-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-tech-accent mb-6">
            Data Privacy
          </h2>
          <p className="text-lg text-tech-gray-light leading-relaxed mb-4">
            All communications through this form are encrypted and stored securely. Information submitted is used exclusively for internal business purposes within the PATEK Global corporate structure.
          </p>
          <p className="text-sm text-tech-gray-light leading-relaxed">
            By submitting this form, you confirm that you are an authorized representative of a PATEK Global parent company or subsidiary entity and agree to our internal data handling policies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
