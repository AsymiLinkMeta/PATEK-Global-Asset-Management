import React from 'react';
import Hero from '../components/Hero';
import { services } from '../data';
import { CheckCircle, ArrowRight, Shield, Users, Target, BarChart3, Globe, Clock, Briefcase, Building2, BarChart as ChartBar, Network, Lock, Award } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Our Services"
        subtitle="Comprehensive asset management solutions tailored to elite portfolios across diverse sectors."
        backgroundClass="bg-services-pattern"
      />

      {/* Services Overview */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Comprehensive Asset Management</h2>
            <p className="section-subtitle">
              Delivering sophisticated investment solutions through strategic expertise and meticulous portfolio management, crafted for our distinguished clientele.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div key={index} className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400 hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 tracking-wide text-center">{service.title}</h3>
                <p className="text-dark-800 mb-6 elegant-spacing text-center">{service.description}</p>
                <div className="space-y-3">
                  {getServiceFeatures(service.title).map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-bronze-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-dark-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-light-50 mb-6">Investment Philosophy</h2>
            <div className="w-24 h-1 bg-bronze-400 mx-auto mb-8"></div>
            <p className="text-xl text-light-200 mb-12 max-w-3xl mx-auto elegant-spacing">
              Our investment approach is built on proven principles, sophisticated analysis, and strategic foresight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <Shield className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Risk Management</h3>
              <p className="text-light-300 elegant-spacing">
                Comprehensive risk assessment and mitigation strategies protect client assets while maintaining exposure to growth opportunities.
              </p>
            </div>

            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <Target className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Strategic Allocation</h3>
              <p className="text-light-300 elegant-spacing">
                Dynamic asset allocation across multiple classes optimizes portfolio performance through various market cycles.
              </p>
            </div>

            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <BarChart3 className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Performance Analytics</h3>
              <p className="text-light-300 elegant-spacing">
                Advanced analytics and reporting provide clear insights into portfolio performance and market opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Standards */}
      <section className="py-20 bg-light-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Service Standards</h2>
            <p className="section-subtitle">
              The principles that guide our service delivery and ensure exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Personalized Attention</h3>
              <p className="text-dark-800 elegant-spacing">
                Every client receives dedicated attention from our senior team members, ensuring your unique needs are understood and addressed.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Transparent Communication</h3>
              <p className="text-dark-800 elegant-spacing">
                Regular updates and detailed reporting keep you informed about your portfolio's performance and strategic adjustments.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Risk Management</h3>
              <p className="text-dark-800 elegant-spacing">
                Comprehensive risk assessment and management protocols protect your assets while pursuing optimal returns.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Global Expertise</h3>
              <p className="text-dark-800 elegant-spacing">
                Access to international markets and opportunities through our worldwide network of industry experts.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Technology Integration</h3>
              <p className="text-dark-800 elegant-spacing">
                State-of-the-art portfolio management systems and secure client interfaces for real-time access to your investments.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Regulatory Compliance</h3>
              <p className="text-dark-800 elegant-spacing">
                Strict adherence to regulatory requirements and industry best practices across all jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Benefits */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Client Benefits</h2>
            <p className="section-subtitle">
              The advantages of partnering with PATEK Global for your asset management needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Users className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Dedicated Team</h3>
              <p className="text-dark-800 mb-6 elegant-spacing">
                Access to a team of experienced professionals dedicated to your portfolio's success.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-bronze-500 mr-3" />
                  <span>Personal relationship manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-bronze-500 mr-3" />
                  <span>Investment specialists</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-bronze-500 mr-3" />
                  <span>Research analysts</span>
                </li>
              </ul>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Globe className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Global Access</h3>
              <p className="text-dark-800 mb-6 elegant-spacing">
                Access to exclusive investment opportunities across international markets.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-bronze-500 mr-3" />
                  <span>International market access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-bronze-500 mr-3" />
                  <span>Exclusive opportunities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-bronze-500 mr-3" />
                  <span>Global network</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Delivery Process */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Service Delivery Process</h2>
            <p className="section-subtitle">
              A methodical approach ensuring precision, transparency, and exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-light-50 p-8 relative shadow-lg border-l-2 border-bronze-400">
              <div className="absolute top-0 left-0 bg-bronze-500 text-light-50 text-xl font-bold w-12 h-12 flex items-center justify-center">
                1
              </div>
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 mt-6">Initial Consultation</h3>
              <p className="text-dark-800 elegant-spacing">
                Comprehensive assessment of your current portfolio, investment objectives, and risk tolerance to establish strategic direction.
              </p>
            </div>
            
            <div className="bg-light-50 p-8 relative shadow-lg border-l-2 border-bronze-400">
              <div className="absolute top-0 left-0 bg-bronze-500 text-light-50 text-xl font-bold w-12 h-12 flex items-center justify-center">
                2
              </div>
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 mt-6">Strategy Development</h3>
              <p className="text-dark-800 elegant-spacing">
                Creation of a tailored asset management strategy aligned with your objectives and market opportunities.
              </p>
            </div>
            
            <div className="bg-light-50 p-8 relative shadow-lg border-l-2 border-bronze-400">
              <div className="absolute top-0 left-0 bg-bronze-500 text-light-50 text-xl font-bold w-12 h-12 flex items-center justify-center">
                3
              </div>
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 mt-6">Implementation</h3>
              <p className="text-dark-800 elegant-spacing">
                Precise execution of your asset management strategy with meticulous attention to detail and timing.
              </p>
            </div>
            
            <div className="bg-light-50 p-8 relative shadow-lg border-l-2 border-bronze-400">
              <div className="absolute top-0 left-0 bg-bronze-500 text-light-50 text-xl font-bold w-12 h-12 flex items-center justify-center">
                4
              </div>
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 mt-6">Ongoing Management</h3>
              <p className="text-dark-800 elegant-spacing">
                Continuous monitoring, regular reporting, and strategic adjustments to ensure optimal performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Engagement */}
      <section className="py-20 bg-light-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Client Engagement</h2>
            <p className="section-subtitle">
              Our commitment to maintaining strong, lasting relationships with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <Clock className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Regular Reviews</h3>
              <p className="text-dark-800 elegant-spacing">
                Scheduled portfolio reviews and strategy sessions ensure alignment with your objectives and market conditions.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <BarChart3 className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Performance Reporting</h3>
              <p className="text-dark-800 elegant-spacing">
                Comprehensive performance reports and analytics provide clear visibility into your portfolio's progress.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <Users className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Dedicated Support</h3>
              <p className="text-dark-800 elegant-spacing">
                Your dedicated relationship manager and support team are available whenever you need assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Areas of Expertise</h2>
            <p className="section-subtitle">
              Specialized knowledge and experience across key sectors and asset classes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Briefcase className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Corporate Finance</h3>
              <p className="text-dark-800 elegant-spacing">
                Strategic financial planning and corporate restructuring for optimal performance.
              </p>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Building2 className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Real Estate</h3>
              <p className="text-dark-800 elegant-spacing">
                Commercial property investment and management across global markets.
              </p>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <ChartBar className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Capital Markets</h3>
              <p className="text-dark-800 elegant-spacing">
                Sophisticated trading strategies and market analysis for optimal returns.
              </p>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Network className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Private Equity</h3>
              <p className="text-dark-800 elegant-spacing">
                Direct investment opportunities in high-potential private companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-light-50 mb-6">Security & Compliance</h2>
            <div className="w-24 h-1 bg-bronze-400 mx-auto mb-8"></div>
            <p className="text-xl text-light-200 mb-12 max-w-3xl mx-auto elegant-spacing">
              Our commitment to protecting your assets and maintaining regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <Lock className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Data Security</h3>
              <p className="text-light-300 elegant-spacing">
                State-of-the-art security protocols and encryption protect your sensitive information and transactions.
              </p>
            </div>

            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <Award className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Regulatory Excellence</h3>
              <p className="text-light-300 elegant-spacing">
                Strict adherence to global regulatory standards and continuous compliance monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://cdn.midjourney.com/7a71a6bc-487e-41de-b2ec-81dd52e5783f/0_3.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-6">Ready to Optimize Your Asset Portfolio?</h2>
            <p className="text-light-200 mb-10 max-w-3xl mx-auto elegant-spacing text-lg">
              Contact our team of experts to discuss how PATEK Global can elevate your investment strategy and asset management approach.
            </p>
            <a href="/contact" className="inline-flex items-center px-8 py-4 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg text-lg">
              Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get service-specific features
const getServiceFeatures = (serviceTitle: string): string[] => {
  const features: Record<string, string[]> = {
    "Corporate Asset Management": [
      "Strategic corporate restructuring",
      "Mergers and acquisitions advisory",
      "Operational efficiency optimization",
      "Performance monitoring and reporting"
    ],
    "Commercial Real Estate": [
      "Property acquisition and development",
      "Asset repositioning strategies",
      "Tenant relationship management",
      "Facility optimization"
    ],
    "Maritime Assets": [
      "Fleet acquisition and management",
      "Crew staffing and training",
      "Maintenance program development",
      "Charter revenue optimization"
    ],
    "Aviation Portfolio": [
      "Aircraft acquisition and fleet planning",
      "Operational efficiency management",
      "Maintenance scheduling",
      "Charter service optimization"
    ],
    "Venture Capital": [
      "Deal flow assessment",
      "Due diligence execution",
      "Growth strategy development",
      "Exit planning"
    ],
    "Infrastructure Investment": [
      "Project feasibility assessment",
      "Risk-return analysis",
      "Regulatory compliance",
      "Stakeholder management"
    ],
    "Family Office Services": [
      "Wealth transfer planning",
      "Tax optimization",
      "Family governance",
      "Next-generation education"
    ],
    "Legal & Compliance": [
      "Regulatory framework navigation",
      "Compliance program development",
      "Risk assessment",
      "Documentation management"
    ],
    "Alternative Investments": [
      "Opportunity identification",
      "Due diligence execution",
      "Portfolio integration",
      "Performance monitoring"
    ]
  };
  
  return features[serviceTitle] || [
    "Strategic planning",
    "Risk management",
    "Performance optimization",
    "Regular reporting"
  ];
};

export default Services;