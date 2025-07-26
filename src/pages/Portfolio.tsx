import React from 'react';
import Hero from '../components/Hero';
import { ArrowRight } from 'lucide-react';

const Portfolio: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Portfolio Management Excellence"
        subtitle="A comprehensive overview of PATEK Global's proven approach to portfolio management and investment strategy."
        backgroundClass="bg-portfolio-pattern"
      />

      {/* Portfolio Management Philosophy */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Investment Philosophy</h2>
            <p className="section-subtitle elegant-spacing">
              Our portfolio management approach is built on proven principles, advanced analysis, and strategic foresight.
            </p>
          </div>

          {/* Strategic Asset Allocation - Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="lg:pr-8">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Strategic Asset Allocation</h3>
              <div className="w-16 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 mb-6 elegant-spacing">
                Our portfolio management strategy begins with a comprehensive approach to asset allocation, carefully balancing risk and return across multiple asset classes. We employ proven quantitative models and qualitative analysis to identify optimal portfolio compositions that align with each client's specific objectives.
              </p>
              <p className="text-dark-800 elegant-spacing">
                Through dynamic rebalancing and strategic adjustments, we maintain portfolio efficiency while capitalizing on emerging opportunities across global markets. This approach ensures resilience through market cycles while pursuing consistent, risk-adjusted returns.
              </p>
            </div>
            <div className="lg:pl-8">
              <img 
                src="https://cdn.midjourney.com/274d84df-a220-4c3b-b350-6921734fd465/0_0.png"
                alt="Strategic Asset Allocation"
                className="w-full h-[400px] object-cover shadow-xl rounded-md border border-bronze-400/30"
              />
            </div>
          </div>

          {/* Risk Management Framework - Image Left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="lg:pr-8">
              <img 
                src="https://cdn.midjourney.com/70751805-a716-4fa9-9d55-13f5f9e76ff6/0_0.png"
                alt="Risk Management"
                className="w-full h-[400px] object-cover shadow-xl rounded-md border border-bronze-400/30"
              />
            </div>
            <div className="lg:pl-8">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Risk Management Framework</h3>
              <div className="w-16 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 mb-6 elegant-spacing">
                Our comprehensive risk management framework integrates multiple layers of analysis and monitoring to protect and enhance portfolio value. We employ proven stress testing, scenario analysis, and real-time risk monitoring systems to identify and mitigate potential risks before they impact portfolio performance.
              </p>
              <p className="text-dark-800 elegant-spacing">
                This proactive approach to risk management allows us to maintain exposure to growth opportunities while implementing appropriate hedging strategies and portfolio adjustments to protect capital through various market conditions.
              </p>
            </div>
          </div>

          {/* Investment Selection Process - Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-8">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Investment Selection Process</h3>
              <div className="w-16 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 mb-6 elegant-spacing">
                Our investment selection process combines thorough quantitative screening with detailed fundamental analysis to identify opportunities across global markets. We leverage proven analytics and industry expertise to evaluate investment opportunities through multiple lenses, ensuring a comprehensive understanding of potential risks and returns.
              </p>
              <p className="text-dark-800 elegant-spacing">
                This disciplined approach to investment selection helps us identify opportunities that offer attractive risk-adjusted returns while maintaining alignment with overall portfolio objectives and risk parameters.
              </p>
            </div>
            <div className="lg:pl-8">
              <img 
                src="https://cdn.midjourney.com/4c5d118f-980e-49bd-9b0c-eb74ea14e03d/0_1.png"
                alt="Investment Selection"
                className="w-full h-[400px] object-cover shadow-xl rounded-md border border-bronze-400/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Construction */}
      <section className="py-20 bg-light-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Portfolio Construction</h2>
            <p className="section-subtitle elegant-spacing">
              Our systematic approach to building and maintaining optimal portfolios across diverse asset classes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Asset Class Selection</h3>
              <div className="w-12 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 elegant-spacing">
                Strategic allocation across traditional and alternative asset classes, optimized for risk-adjusted returns and portfolio efficiency. Our approach considers correlations, liquidity profiles, and market conditions to create resilient portfolios.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Portfolio Optimization</h3>
              <div className="w-12 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 elegant-spacing">
                Advanced optimization techniques that balance expected returns, risk factors, and investment constraints to create efficient portfolios aligned with client objectives and market opportunities.
              </p>
            </div>

            <div className="bg-light-100 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Risk Budgeting</h3>
              <div className="w-12 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 elegant-spacing">
                Comprehensive approach to allocating risk across portfolio components, ensuring optimal risk-return characteristics while maintaining alignment with investment objectives and constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Monitoring */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Performance Monitoring</h2>
            <p className="section-subtitle elegant-spacing">
              Comprehensive monitoring and analysis of portfolio performance to ensure alignment with investment objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Performance Attribution</h3>
              <div className="w-16 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 mb-6 elegant-spacing">
                Detailed analysis of portfolio performance drivers, identifying contributions from asset allocation, security selection, and market factors. This analysis informs strategic adjustments and enhances future decision-making.
              </p>
              <ul className="space-y-4 text-dark-800">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-bronze-400 rounded-full mr-3"></span>
                  <span>Returns analysis across multiple time periods</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-bronze-400 rounded-full mr-3"></span>
                  <span>Risk-adjusted performance metrics</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-bronze-400 rounded-full mr-3"></span>
                  <span>Benchmark comparison and analysis</span>
                </li>
              </ul>
            </div>

            <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 tracking-wide">Risk Analytics</h3>
              <div className="w-16 h-0.5 bg-bronze-400 mb-6"></div>
              <p className="text-dark-800 mb-6 elegant-spacing">
                Continuous monitoring of portfolio risk metrics and exposure analysis to ensure alignment with risk management objectives and identify potential areas of concern.
              </p>
              <ul className="space-y-4 text-dark-800">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-bronze-400 rounded-full mr-3"></span>
                  <span>Factor exposure analysis</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-bronze-400 rounded-full mr-3"></span>
                  <span>Liquidity risk assessment</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-bronze-400 rounded-full mr-3"></span>
                  <span>Correlation analysis and diversification metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-6">Transform Your Investment Strategy</h2>
          <p className="text-light-200 mb-10 max-w-3xl mx-auto elegant-spacing">
            Connect with our team to explore how PATEK Global's proven portfolio management approach can enhance your investment outcomes.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center">
            Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;