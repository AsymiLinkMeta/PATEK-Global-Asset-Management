import React, { useState } from 'react';
import Hero from '../components/Hero';
import InsightCard from '../components/InsightCard';
import CategoryCard from '../components/CategoryCard';
import FeaturedInsight from '../components/FeaturedInsight';
import { insights, insightCategories } from '../data';
import { Search, Filter, ArrowRight, Mail } from 'lucide-react';

const Insights: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  
  // Get featured insights
  const featuredInsights = insights.filter(insight => insight.featured);
  const mainFeaturedInsight = featuredInsights[0];
  
  // Filter insights based on search and category
  const filteredInsights = insights.filter(insight => {
    const matchesSearch = searchTerm === '' || 
      insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || insight.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get all unique categories from insights
  const categories = ['All', ...new Set(insights.map(insight => insight.category))];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our insights newsletter.');
    setEmail('');
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Insights & Perspectives"
        subtitle="Expert analysis and thought leadership on market trends, investment strategies, and wealth management best practices."
        backgroundClass="bg-insights-pattern"
      />

      {/* Featured Insight */}
      <section className="bg-light-100">
        <div className="max-w-9xl mx-auto">
          <FeaturedInsight insight={mainFeaturedInsight} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-light-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Explore Our Expertise</h2>
            <p className="section-subtitle">
              Discover in-depth analysis and strategic perspectives across key areas of focus.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {insightCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-light-50 p-8 shadow-lg border-l-2 border-bronze-400">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search insights..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-600" />
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Insights</h2>
            <p className="section-subtitle">
              Our most impactful analysis and strategic perspectives on current market trends.
            </p>
          </div>
          
          <div className="space-y-12">
            {featuredInsights.slice(1, 3).map((insight) => (
              <InsightCard key={insight.id} insight={insight} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* All Insights */}
      <section className="py-20 bg-light-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Latest Insights</h2>
            <p className="section-subtitle">
              Stay informed with our latest perspectives on market trends and investment opportunities.
            </p>
          </div>
          
          {filteredInsights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-dark-800">No insights found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-bronze-500 hover:text-bronze-600 transition-colors duration-300"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Market Outlook */}
      <section className="py-20 bg-light-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Market Outlook</h2>
            <p className="section-subtitle">
              Our analysis of current market conditions and future trends across key sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-light-50 p-8 shadow-md border-l-2 border-bronze-400">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 text-center">Global Real Estate Trends</h3>
              <div className="w-12 h-0.5 bg-bronze-400 mb-6 mx-auto"></div>
              <p className="text-dark-800 mb-6 elegant-spacing text-center">
                The commercial real estate landscape continues to evolve rapidly in response to changing work patterns, technological advancements, and sustainability imperatives. Premium properties in financial centers are showing remarkable resilience, with demand for Class A office space rebounding strongly in key markets.
              </p>
              <p className="text-dark-800 mb-6 elegant-spacing text-center">
                We anticipate continued growth in mixed-use developments that combine commercial, residential, and retail elements, particularly in urban centers undergoing revitalization. Investors with strategic vision and the ability to reposition assets will find significant opportunities in this sector.
              </p>
              <div className="text-center">
                <a href="/insights/category/real-estate" className="inline-flex items-center text-bronze-500 hover:text-bronze-600 transition-colors duration-300 tracking-wide">
                  Read Full Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-light-50 p-8 shadow-md border-l-2 border-bronze-400">
              <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 text-center">Aviation Sector Recovery</h3>
              <div className="w-12 h-0.5 bg-bronze-400 mb-6 mx-auto"></div>
              <p className="text-dark-800 mb-6 elegant-spacing text-center">
                The private aviation sector has demonstrated exceptional resilience, with demand for charter services and aircraft ownership reaching unprecedented levels. This trend is expected to continue as high-net-worth individuals and corporations increasingly value the flexibility, efficiency, and privacy offered by private aviation.
              </p>
              <p className="text-dark-800 mb-6 elegant-spacing text-center">
                Fleet optimization and operational efficiency will be key differentiators in this competitive landscape. We see particular value in strategic acquisitions of newer, more fuel-efficient aircraft that offer both environmental benefits and lower operating costs.
              </p>
              <div className="text-center">
                <a href="/insights/category/aviation" className="inline-flex items-center text-bronze-500 hover:text-bronze-600 transition-colors duration-300 tracking-wide">
                  Read Full Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quarterly Report */}
      <section className="py-20 bg-dark-900" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), url('https://cdn.midjourney.com/639fb269-03dc-4d99-9312-312db578b636/0_0.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-light-50 leading-tight">Quarterly Market Report</h2>
            <div className="w-24 h-1 bg-bronze-400 mx-auto mb-8"></div>
            <p className="text-xl text-light-200 mb-12 max-w-3xl mx-auto elegant-spacing">
              Our comprehensive analysis of global market trends, investment opportunities, and strategic perspectives for the current quarter.
            </p>
          </div>
          
          <div className="bg-dark-800/70 p-12 border border-bronze-400/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-semibold text-light-50 mb-6 text-center">Q2 2025 Global Market Outlook</h3>
            <div className="w-16 h-0.5 bg-bronze-400 mb-8 mx-auto"></div>
            
            <div className="space-y-6 text-light-300 elegant-spacing text-center">
              <p>
                The second quarter of 2025 presents a complex global investment landscape characterized by divergent monetary policies, technological disruption, and evolving geopolitical dynamics. Our analysis identifies strategic opportunities across multiple asset classes and regions.
              </p>
              <p>
                Key themes include the acceleration of digital transformation in traditional industries, the continued evolution of sustainable investment frameworks, and the strategic repositioning of global supply chains in response to geopolitical pressures.
              </p>
              <p>
                This comprehensive report provides sophisticated investors with actionable insights and strategic perspectives to navigate this dynamic environment and position portfolios for long-term success.
              </p>
            </div>
            
            <div className="mt-10 text-center">
              <a href="/insights/quarterly-report" className="inline-flex items-center px-8 py-3 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg">
                Download Full Report <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-light-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Stay Informed</h2>
            <p className="section-subtitle">
              Subscribe to receive our latest insights and analysis directly to your inbox.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-light-100 p-10 shadow-lg border-l-2 border-bronze-400">
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-light-200 text-dark-900 border border-light-400 focus:border-bronze-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-3 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg"
                  >
                    Subscribe <Mail className="ml-2 h-5 w-5" />
                  </button>
                </div>
                <p className="text-dark-600 text-sm elegant-spacing text-center">
                  By subscribing, you'll receive our quarterly market outlook, featured insights, and exclusive event invitations. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-6">Elevate Your Investment Strategy</h2>
          <p className="text-light-300 mb-10 max-w-3xl mx-auto elegant-spacing">
            Connect with our team of experts to discuss how PATEK Global's insights and expertise can transform your investment approach.
          </p>
          <a href="/contact" className="btn-primary">
            Schedule a Private Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

export default Insights;