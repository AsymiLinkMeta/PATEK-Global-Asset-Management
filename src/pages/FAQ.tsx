import React, { useState } from 'react';
import Hero from '../components/Hero';
import { Search, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqItems: FAQItem[] = [
    // General FAQs
    {
      question: "What is the minimum portfolio size for PATEK Global clients?",
      answer: "PATEK Global typically works with clients who have portfolios of $100 million or more. However, we evaluate each potential client relationship based on the specific assets involved and the strategic fit with our expertise.",
      category: "General"
    },
    {
      question: "Is a reference from an existing client required?",
      answer: "While a reference or introduction from our existing distinguished clientele is preferred as it aligns with our tradition of cultivating relationships through trusted networks, it is not a mandatory requirement. We evaluate each potential client relationship based on its individual merits, ensuring alignment with our values and service capabilities.",
      category: "General"
    },
    {
      question: "How does PATEK Global's fee structure work?",
      answer: "Our fee structure is tailored to each client relationship and the specific services provided. We typically use a combination of management fees based on assets under management and performance-based incentives aligned with client objectives.",
      category: "General"
    },
    {
      question: "What differentiates PATEK Global from other asset management firms?",
      answer: "PATEK Global's distinctive advantage lies in our sector-specific expertise across diverse asset classes, our global network of industry relationships, and our proven track record of delivering exceptional results for elite clients worldwide.",
      category: "General"
    },
    {
      question: "What is PATEK Global's client retention rate?",
      answer: "PATEK Global maintains an industry-leading client retention rate over the past decade. This exceptional retention rate reflects our commitment to delivering consistent, superior results and maintaining strong, trust-based relationships with our clients.",
      category: "General"
    },
    {
      question: "Does PATEK Global have a minimum contract term?",
      answer: "We do not impose rigid minimum contract terms on our clients. While we believe in building long-term relationships, we understand that flexibility is important. Our agreements typically include a notice period for termination, ensuring a smooth transition if needed.",
      category: "General"
    },
    
    // Process FAQs - 6 items
    {
      question: "How does the client onboarding process work?",
      answer: "Our onboarding process begins with an initial consultation to understand your objectives, followed by a comprehensive assessment of your current portfolio. We then develop a tailored asset management strategy, which is presented and refined before implementation.",
      category: "Process"
    },
    {
      question: "What reporting and communication can I expect as a client?",
      answer: "PATEK Global provides comprehensive monthly performance reports, quarterly strategic reviews, and annual portfolio assessments. Each client is assigned a dedicated relationship manager who is available for consultations at any time, and our executive team conducts regular personal meetings with clients to ensure alignment with evolving objectives.",
      category: "Process"
    },
    {
      question: "How does PATEK Global handle client transitions or exits?",
      answer: "We approach client transitions with the same level of care and precision as all other aspects of our service. Whether a client is transitioning assets to the next generation, restructuring their portfolio, or exiting certain investments, we develop comprehensive transition plans that minimize disruption, optimize tax considerations, and ensure continuity of asset performance.",
      category: "Process"
    },
    {
      question: "How frequently will I meet with my asset management team?",
      answer: "We schedule formal quarterly review meetings with all clients, but the frequency of interaction is tailored to each client's preferences. Some clients prefer monthly check-ins, while others may request more frequent communication during periods of significant market volatility or when executing complex transactions. Your dedicated relationship manager is available whenever needed.",
      category: "Process"
    },
    {
      question: "What is your approach to performance benchmarking?",
      answer: "We establish customized performance benchmarks for each client portfolio based on asset allocation, risk parameters, and specific objectives. These benchmarks combine relevant market indices, peer group comparisons, and absolute return targets to provide a comprehensive evaluation framework that aligns with your unique investment strategy.",
      category: "Process"
    },
    {
      question: "How do you handle disagreements about investment strategy?",
      answer: "We view our client relationships as collaborative partnerships. When strategic disagreements arise, we engage in transparent dialogue, presenting detailed analysis and rationale for our recommendations while carefully considering client perspectives. Our goal is to reach consensus through education and mutual understanding, ensuring that final decisions align with both our expertise and the client's comfort level.",
      category: "Process"
    },
    
    // Investment FAQs - 6 items
    {
      question: "How does PATEK Global approach risk management?",
      answer: "Our risk management philosophy integrates sophisticated quantitative analysis with qualitative assessment of market conditions and geopolitical factors. We employ a multi-layered approach that includes diversification across asset classes, continuous monitoring of portfolio risk metrics, stress testing under various market scenarios, and strategic hedging when appropriate.",
      category: "Investment"
    },
    {
      question: "Can PATEK Global accommodate specific investment preferences or restrictions?",
      answer: "Absolutely. We recognize that each client has unique preferences, values, and constraints. Our investment approach is highly customizable, allowing for the integration of specific sector exclusions, ESG considerations, liquidity requirements, tax optimization strategies, and other client-specific parameters while maintaining our commitment to exceptional performance.",
      category: "Investment"
    },
    {
      question: "What is PATEK Global's approach to alternative investments?",
      answer: "PATEK Global has developed significant expertise in alternative investments, including private equity, venture capital, real estate, and specialized assets. Our approach combines rigorous due diligence, exclusive access to premium opportunities through our global network, and sophisticated portfolio construction to optimize the role of alternatives within a client's overall investment strategy.",
      category: "Investment"
    },
    {
      question: "How does PATEK Global stay informed about emerging market opportunities?",
      answer: "Our research team conducts continuous analysis of global markets, economic trends, and sector-specific developments. We maintain an extensive network of industry contacts, participate in exclusive investment forums, and leverage proprietary data analytics to identify emerging opportunities before they become widely recognized.",
      category: "Investment"
    },
    {
      question: "What is PATEK Global's approach to sustainable and ESG investing?",
      answer: "We integrate environmental, social, and governance (ESG) considerations into our investment process while maintaining our focus on superior returns. Our approach is tailored to each client's specific values and objectives, ranging from basic ESG screening to sophisticated impact investment strategies that target specific environmental or social outcomes alongside financial returns.",
      category: "Investment"
    },
    {
      question: "How do you manage liquidity in client portfolios?",
      answer: "We design portfolios with carefully calibrated liquidity tiers that align with each client's specific cash flow needs, time horizon, and potential contingencies. Our liquidity management framework includes dedicated short-term reserves, strategic allocation to liquid market instruments, and measured exposure to less liquid investments with higher return potential, all continuously monitored and adjusted as client circumstances evolve.",
      category: "Investment"
    },
    
    // International FAQs - 6 items
    {
      question: "How does PATEK Global handle international investments and cross-border considerations?",
      answer: "Our team includes experts in international finance, tax optimization, and regulatory compliance across major global jurisdictions. We provide comprehensive solutions for cross-border investments, including currency management strategies, international tax planning, regulatory navigation, and coordination with clients' existing legal and tax advisors to ensure seamless global portfolio management.",
      category: "International"
    },
    {
      question: "What geographic regions does PATEK Global operate in?",
      answer: "PATEK Global maintains offices in key financial centers across North America, Europe, Asia, and the Middle East. Our global presence allows us to provide seamless service to clients worldwide while maintaining deep local market knowledge and regulatory expertise in each region.",
      category: "International"
    },
    {
      question: "How does PATEK Global manage currency risk in international portfolios?",
      answer: "We employ a sophisticated currency management strategy that combines natural hedging through diversified currency exposure, strategic hedging using derivatives when appropriate, and active currency positioning based on our macroeconomic outlook. Our approach is tailored to each client's base currency, risk tolerance, and specific objectives regarding currency exposure.",
      category: "International"
    },
    {
      question: "Can PATEK Global assist with establishing international investment structures?",
      answer: "Yes, we have extensive experience in designing and implementing international investment structures that optimize tax efficiency, regulatory compliance, and asset protection. We work closely with leading international tax and legal advisors to create bespoke solutions aligned with each client's specific jurisdictional requirements and global objectives.",
      category: "International"
    },
    {
      question: "How does PATEK Global navigate different regulatory environments?",
      answer: "Our global compliance team maintains comprehensive knowledge of regulatory requirements across all major financial jurisdictions. We implement robust compliance frameworks tailored to each region's specific requirements, conduct regular regulatory reviews, and proactively adapt to evolving regulations to ensure our clients' investments remain fully compliant in all jurisdictions.",
      category: "International"
    },
    {
      question: "Does PATEK Global offer multi-currency reporting?",
      answer: "Yes, we provide sophisticated multi-currency reporting capabilities that allow clients to view their portfolio performance in their preferred base currency while also tracking underlying currency exposures and effects. Our reporting platform can present consolidated views across multiple jurisdictions, entities, and currencies with full transparency.",
      category: "International"
    },
    
    // Security FAQs - 6 items
    {
      question: "What security measures does PATEK Global employ to protect client information?",
      answer: "PATEK Global employs state-of-the-art cybersecurity protocols and encryption technologies to safeguard client information. Our multi-layered security infrastructure includes advanced threat detection systems, regular security audits by independent specialists, strict access controls, and comprehensive staff training on information security best practices. Client confidentiality is paramount in all our operations.",
      category: "Security"
    },
    {
      question: "How does PATEK Global ensure data privacy compliance?",
      answer: "We maintain strict compliance with global data privacy regulations including GDPR, CCPA, and other regional requirements. Our comprehensive data privacy framework includes detailed data mapping, privacy impact assessments, robust consent management, and regular compliance reviews. We limit data collection to essential information and implement strict data retention policies.",
      category: "Security"
    },
    {
      question: "What measures are in place to protect against cyber threats?",
      answer: "Our cybersecurity infrastructure includes enterprise-grade firewalls, intrusion detection systems, 24/7 security monitoring, advanced endpoint protection, and regular penetration testing by independent security firms. We employ a defense-in-depth strategy with multiple security layers and maintain an incident response team ready to address any potential threats immediately.",
      category: "Security"
    },
    {
      question: "How does PATEK Global secure client communications?",
      answer: "All client communications are protected using enterprise-grade encryption both in transit and at rest. Our secure client portal employs multi-factor authentication, biometric verification options, and session timeout controls. For sensitive discussions, we offer secure video conferencing and encrypted messaging options that exceed industry security standards.",
      category: "Security"
    },
    {
      question: "What physical security measures are in place at PATEK Global offices?",
      answer: "Our offices feature comprehensive physical security systems including biometric access controls, 24/7 security personnel, CCTV monitoring, and secure meeting rooms for confidential client discussions. All sensitive documents are stored in access-controlled areas with strict handling protocols, and we maintain a clean desk policy to prevent unauthorized access to information.",
      category: "Security"
    },
    {
      question: "How does PATEK Global handle security incident response?",
      answer: "We maintain a dedicated security incident response team that follows a comprehensive protocol for addressing potential security events. This includes immediate containment measures, thorough investigation, client notification when appropriate, remediation actions, and post-incident analysis to strengthen our security posture. Regular simulations and tabletop exercises ensure our team is prepared to respond swiftly and effectively to any security incident.",
      category: "Security"
    },
    
    // Services FAQs - 6 items
    {
      question: "Does PATEK Global offer family office services?",
      answer: "Yes, PATEK Global offers comprehensive family office services for ultra-high-net-worth families. Our services include multi-generational wealth planning, consolidated reporting across all family assets, coordination with external advisors, family governance support, and education for next-generation family members.",
      category: "Services"
    },
    {
      question: "What specialized services does PATEK Global offer for corporate clients?",
      answer: "For corporate clients, we provide treasury management, strategic capital allocation, pension fund management, and executive compensation planning. Our corporate services team specializes in optimizing corporate balance sheets, managing excess cash positions, and aligning investment strategies with operational cash flow requirements and strategic corporate objectives.",
      category: "Services"
    },
    {
      question: "Does PATEK Global provide estate and succession planning services?",
      answer: "Yes, we offer sophisticated estate and succession planning services in coordination with our clients' legal and tax advisors. Our approach focuses on preserving wealth across generations, minimizing transfer taxes, creating effective governance structures for family assets, and preparing next-generation family members for their future responsibilities.",
      category: "Services"
    },
    {
      question: "What services does PATEK Global offer for maritime asset management?",
      answer: "Our maritime asset management services include acquisition and sale of luxury yachts, operational management, crew selection and management, maintenance program development, charter revenue optimization, regulatory compliance, and flag state administration. We provide comprehensive oversight of all aspects of maritime asset ownership.",
      category: "Services"
    },
    {
      question: "What services does PATEK Global offer for aviation assets?",
      answer: "Our aviation asset management services encompass aircraft acquisition and disposition, operational oversight, crew management, maintenance program administration, charter revenue optimization, regulatory compliance, and hangarage arrangements. We manage all aspects of aircraft ownership to maximize utility while minimizing operational complexities.",
      category: "Services"
    },
    {
      question: "Does PATEK Global offer art and collectibles management services?",
      answer: "Yes, we provide specialized services for art and collectibles including acquisition advisory, authentication, valuation, insurance arrangement, conservation management, exhibition loans, and eventual disposition strategies. Our art management team includes experts in various collecting categories who provide objective guidance on building and managing significant collections.",
      category: "Services"
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqItems.map(item => item.category)))];
  
  // Filter FAQs based on search term and category
  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group FAQs by category for the tile layout
  const groupedFAQs: Record<string, FAQItem[]> = {};
  
  if (activeCategory === 'All') {
    // Group by category when showing all
    categories.forEach(category => {
      if (category !== 'All') {
        groupedFAQs[category] = filteredFAQs.filter(faq => faq.category === category);
      }
    });
  } else {
    // Just use the filtered FAQs when a specific category is selected
    groupedFAQs[activeCategory] = filteredFAQs;
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services, investment approach, and client relationships."
        backgroundClass="bg-services-pattern"
      />

      {/* Search and Filter Section */}
      <section className="py-12 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-600" />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="md:col-span-2 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-bronze-500 text-light-50 shadow-md'
                        : 'bg-light-200 text-dark-800 hover:bg-light-300 border border-bronze-300/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Tile Layout */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Common Questions</h2>
            <p className="section-subtitle elegant-spacing">
              Browse through our comprehensive FAQ to learn more about PATEK Global's approach to asset management.
            </p>
          </div>
          
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-light-50 shadow-md p-8">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4">No Questions Found</h3>
              <p className="text-dark-800 mb-6">We couldn't find any questions matching your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            Object.entries(groupedFAQs).map(([category, faqs]) => (
              faqs.length > 0 && (
                <div key={category} className="mb-16">
                  <h3 className="text-2xl font-display font-semibold text-dark-900 mb-8 text-center">
                    {category} Questions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {faqs.map((faq, index) => (
                      <div 
                        key={index} 
                        className="bg-light-50 p-6 shadow-lg border-b-2 border-bronze-400 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                      >
                        <h4 className="text-xl font-display font-semibold text-dark-900 mb-4 tracking-wide">
                          {faq.question}
                        </h4>
                        <div className="w-12 h-0.5 bg-bronze-400 mb-4"></div>
                        <p className="text-dark-800 elegant-spacing flex-grow">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))
          )}
        </div>
      </section>

      {/* Additional Questions Section */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Still Have Questions?</h2>
            <p className="section-subtitle elegant-spacing">
              Our team of experts is ready to address any additional questions you may have about our services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-light-50 p-10 shadow-lg border-l-2 border-bronze-400 text-center">
            <h3 className="text-2xl font-display font-semibold text-dark-900 mb-6 tracking-wide">Contact Our Client Relations Team</h3>
            <p className="text-dark-800 mb-8 elegant-spacing">
              If you couldn't find the answer to your question, our dedicated client relations team is available to provide personalized assistance and information about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Contact Us
              </a>
              <a href="tel:+17868259635" className="btn-secondary">
                Call Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://cdn.midjourney.com/6020ad62-693f-4fe4-aa21-dff37fe2ef98/0_3.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto bg-dark-900/60 backdrop-blur-sm p-12 border border-bronze-400/50 shadow-2xl relative">
            <div className="absolute inset-0 border border-bronze-400/70"></div>
            
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-6">Ready to Elevate Your Asset Portfolio?</h2>
            
            <div className="w-32 h-0.5 bg-bronze-400 my-8 mx-auto"></div>
            
            <p className="text-light-200 mb-10 max-w-3xl mx-auto elegant-spacing text-xl">
              Contact our team today to begin the conversation about how PATEK Global can help you achieve exceptional results.
            </p>
            
            <a href="/contact" className="inline-flex items-center px-8 py-4 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg text-lg">
              Schedule a Private Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;