import React from 'react';
import Hero from '../components/Hero';
import { Award, Target, Users, TrendingUp, BarChart3, Globe, Shield, Building2, Landmark, Ship, Plane, Network, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div>
      <Hero
        title="About Us"
        subtitle="A legacy of excellence in global asset management, built on expertise, innovation, and unwavering commitment to delivering exceptional results for our distinguished clients."
        backgroundClass="bg-about-pattern"
      />

      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle elegant-spacing">
              The principles that guide our decisions and shape our approach to wealth management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Award className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Excellence</h3>
              <p className="text-dark-800 elegant-spacing">
                Pursuing the highest standards in everything we do, from investment strategies to client service.
              </p>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Shield className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Integrity</h3>
              <p className="text-dark-800 elegant-spacing">
                Maintaining unwavering ethical standards and transparency in all our operations and client relationships.
              </p>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Target className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Innovation</h3>
              <p className="text-dark-800 elegant-spacing">
                Continuously evolving our strategies and technologies to stay ahead of market trends and opportunities.
              </p>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <Users className="h-12 w-12 text-bronze-500 mb-6" />
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4">Client Focus</h3>
              <p className="text-dark-800 elegant-spacing">
                Placing our clients' interests first and delivering personalized solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-light-50 mb-6">Global Presence</h2>
            <div className="w-24 h-1 bg-bronze-400 mx-auto mb-8"></div>
            <p className="text-xl text-light-200 mb-12 max-w-3xl mx-auto elegant-spacing">
              Strategic locations across major financial centers, enabling comprehensive global service capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <Landmark className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Americas</h3>
              <p className="text-light-300 elegant-spacing">
                Headquarters in Miami with strategic presence in New York, Toronto, and São Paulo.
              </p>
            </div>

            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <Building2 className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Europe</h3>
              <p className="text-light-300 elegant-spacing">
                Offices in London, Zurich, and Frankfurt serving European markets and clients.
              </p>
            </div>

            <div className="bg-dark-800/50 p-8 border border-bronze-400/30 backdrop-blur-sm">
              <Globe className="h-12 w-12 text-bronze-400 mb-6" />
              <h3 className="text-xl font-display font-semibold text-light-50 mb-4">Asia-Pacific</h3>
              <p className="text-light-300 elegant-spacing">
                Regional operations in Singapore, Hong Kong, and Dubai providing comprehensive coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Diverse Investment Profile</h2>
            <p className="section-subtitle elegant-spacing">
              Our comprehensive approach to asset management spans multiple sectors and investment strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-6">Traditional Assets</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Building2 className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-semibold text-dark-900 mb-2">Commercial Real Estate</h4>
                    <p className="text-dark-800 elegant-spacing">
                      Premium commercial properties in strategic global locations, managed for optimal returns and long-term value appreciation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-semibold text-dark-900 mb-2">Corporate Securities</h4>
                    <p className="text-dark-800 elegant-spacing">
                      Carefully selected equity and fixed-income investments in established companies with strong growth potential.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-semibold text-dark-900 mb-2">Global Markets</h4>
                    <p className="text-dark-800 elegant-spacing">
                      Diversified exposure to international markets through sophisticated investment vehicles and strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-6">Alternative Investments</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Ship className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-semibold text-dark-900 mb-2">Maritime Assets</h4>
                    <p className="text-dark-800 elegant-spacing">
                      Strategic investments in luxury yachts and commercial vessels, optimized for both personal use and charter revenue.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Plane className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-semibold text-dark-900 mb-2">Aviation Portfolio</h4>
                    <p className="text-dark-800 elegant-spacing">
                      Private aircraft investments managed for optimal utilization and value preservation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Network className="h-6 w-6 text-bronze-500 mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-semibold text-dark-900 mb-2">Private Equity</h4>
                    <p className="text-dark-800 elegant-spacing">
                      Direct investments in promising private companies across various sectors and growth stages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4">Investment Approach</h3>
              <p className="text-dark-800 elegant-spacing max-w-3xl mx-auto">
                Our investment strategy combines thorough market analysis, strategic asset allocation, and continuous portfolio optimization to deliver superior risk-adjusted returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-bronze-500 mb-4 mx-auto" />
                <h4 className="text-lg font-semibold text-dark-900 mb-2">Risk Management</h4>
                <p className="text-dark-800 elegant-spacing">
                  Sophisticated risk assessment and mitigation strategies protect portfolio value.
                </p>
              </div>

              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-bronze-500 mb-4 mx-auto" />
                <h4 className="text-lg font-semibold text-dark-900 mb-2">Performance Optimization</h4>
                <p className="text-dark-800 elegant-spacing">
                  Continuous monitoring and adjustment to maximize investment returns.
                </p>
              </div>

              <div className="text-center">
                <Target className="h-12 w-12 text-bronze-500 mb-4 mx-auto" />
                <h4 className="text-lg font-semibold text-dark-900 mb-2">Strategic Allocation</h4>
                <p className="text-dark-800 elegant-spacing">
                  Dynamic asset allocation across sectors and investment types.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), url('https://cdn.midjourney.com/ead2ab4a-d962-4866-893f-d099953f336b/0_1.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-6">Join Our Exclusive Network of Distinguished Clients</h2>
          <p className="text-light-200 mb-10 max-w-3xl mx-auto elegant-spacing">
            Experience the PATEK Global difference with bespoke wealth management solutions meticulously tailored to your unique requirements.
          </p>
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg">
            Arrange a Private Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
