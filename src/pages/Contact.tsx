import React from 'react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div>
      <Hero
        title="Contact Us"
        subtitle="Connect with our team of experts to discuss how PATEK Global can optimize your asset portfolio."
        backgroundClass="bg-contact-pattern"
      />

      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-center">
              <h2 className="text-3xl font-display font-semibold text-dark-900 mb-6 text-center">Get in Touch</h2>
              <p className="text-dark-800 mb-8 elegant-spacing text-center">
                Our team of experts is ready to discuss your asset management needs and how PATEK Global can help you achieve exceptional results.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start justify-center">
                  <MapPin className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-dark-900 font-semibold mb-1 text-center">Headquarters</h3>
                    <p className="text-dark-800 text-center">701 Brickell Ave, Miami, FL 33131, United States</p>
                  </div>
                </div>

                <div className="flex items-start justify-center">
                  <Mail className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-dark-900 font-semibold mb-1 text-center">Email</h3>
                    <p className="text-dark-800 text-center">inquiries@patekglobal.com</p>
                  </div>
                </div>

                <div className="flex items-start justify-center">
                  <Clock className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h3 className="text-dark-900 font-semibold mb-1 text-center">Hours</h3>
                    <p className="text-dark-800 text-center">Monday - Friday: 10:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
              </div>

              <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400 text-center">
                <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 text-center">Private Client Services</h3>
                <p className="text-dark-800 mb-6 elegant-spacing text-center">
                  For our distinguished clients requiring the highest level of discretion and personalized service, our Private Client team is available for consultations at your convenience.
                </p>
                <a href="tel:+17868259635" className="btn-secondary inline-flex items-center">
                  Schedule a Call
                </a>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-display font-semibold text-dark-900 mb-6 text-center">Inquiry Form</h2>
              <p className="text-dark-800 mb-8 elegant-spacing text-center">
                Complete the form below to discuss your asset management needs with our team of experts.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), url('https://cdn.midjourney.com/69e63bb1-ef35-47cf-a701-79f42777f49b/0_0.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-6 text-center">Ready to Optimize Your Asset Portfolio?</h2>
          <p className="text-light-200 mb-10 max-w-3xl mx-auto elegant-spacing text-center">
            Contact our team today to begin the conversation about how PATEK Global can help you achieve exceptional results.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="tel:+17868259635" className="inline-flex items-center px-8 py-4 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg">
              Call Us Now
            </a>
            <a href="mailto:inquiries@patekglobal.com" className="inline-flex items-center px-8 py-4 border border-bronze-500 text-bronze-500 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-500 hover:text-light-50 shadow-lg">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
