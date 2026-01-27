import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="Excellence in Global Asset Management"
        subtitle="PATEK Global delivers proven wealth management strategies with precision and expertise, serving accomplished individuals worldwide."
        ctaText="Learn More"
        ctaLink="/services"
        backgroundClass="bg-hero-pattern"
      />

      <section className="py-20 bg-light-100 flex items-center justify-center min-h-screen">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="text-center max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-dark-900 mb-6 leading-tight">Unrivaled Expertise in Asset Management</h2>
              <p className="text-dark-800 mb-6 elegant-spacing">
                PATEK Global represents excellence in asset management, where exceptional wealth flourishes under the guidance of experienced professionals. Our approach combines proven market insight with effective investment strategies.
              </p>
              <p className="text-dark-800 mb-8 elegant-spacing">
                Through strategic planning and careful execution, we help preserve and grow our clients' legacies with the confidence that comes from decades of successful service. It is this commitment to excellence that has earned us the trust of accomplished investors worldwide.
              </p>
              <div>
                <a href="/about" className="btn-secondary inline-flex items-center">
                  About PATEK Global <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary-pattern bg-cover bg-center parallax">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-light-50 leading-tight">Professional Services</h2>
            <p className="text-xl text-light-200 mb-12 max-w-3xl mx-auto elegant-spacing">
              Comprehensive solutions tailored to meet the complex needs of significant wealth management, delivered with expertise and professionalism.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/services" className="btn-primary inline-flex items-center">
              Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900 bg-opacity-95" style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), url('https://cdn.midjourney.com/639fb269-03dc-4d99-9312-312db578b636/0_0.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-6 leading-tight">Build Your Legacy</h2>
          <p className="text-light-300 mb-10 max-w-3xl mx-auto elegant-spacing">
            Discover how PATEK Global's professional approach to asset management can help secure and enhance your legacy for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Schedule a Consultation
            </a>
            <a href="/about" className="btn-secondary">
              About PATEK Global
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
