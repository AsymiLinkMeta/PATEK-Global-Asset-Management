import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry. Our team will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  return (
    <form action="mailto:Inquiries@PATEKGlobal.com" method="post" encType="text/plain" onSubmit={handleSubmit} className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400 text-center">
      <p className="text-dark-800 mb-8 elegant-spacing">
        Please provide your information below and we'll respond promptly to your inquiry.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-dark-900 mb-2 tracking-wide text-center">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none text-center"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-dark-900 mb-2 tracking-wide text-center">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none text-center"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-dark-900 mb-2 tracking-wide text-center">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none text-center"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-dark-900 mb-2 tracking-wide text-center">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none text-center"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="service" className="block text-dark-900 mb-2 tracking-wide text-center">Service of Interest</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none text-center"
        >
          <option value="">Select a Service</option>
          <option value="corporate">Corporate Asset Management</option>
          <option value="realestate">Commercial Real Estate</option>
          <option value="maritime">Maritime Assets</option>
          <option value="aviation">Aviation Portfolio</option>
          <option value="defense">Defense Projects</option>
          <option value="venture">Venture Capital</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-dark-900 mb-2 tracking-wide text-center">Your Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full px-4 py-3 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none text-center"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      
      <div className="flex justify-center">
        <button type="submit" className="btn-primary inline-flex items-center">
          Send Message <Send className="ml-2 h-5 w-5" />
        </button>
      </div>
      
      <p className="text-dark-600 text-sm mt-6 elegant-spacing">
        We respect your privacy and are committed to protecting your personal information.
      </p>
    </form>
  );
};

export default ContactForm;