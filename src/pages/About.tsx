import React from 'react';
import { Shield, Lock, Server, Database, Code, Settings, FileText, Building2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-tech-dark text-tech-gray-light">
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-tech-darker to-tech-dark">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-tech-accent mb-6">
            About PATEK Global
          </h1>
          <p className="text-2xl md:text-3xl text-tech-blue-light mb-8">
            Patented Technologies Global
          </p>
          <p className="text-xl text-tech-gray-light max-w-4xl mx-auto leading-relaxed">
            A private company developing proprietary systems and processes exclusively for our parent companies and subsidiaries.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tech-accent mb-6">
              What is PATEK Global?
            </h2>
            <p className="text-xl text-tech-gray-light max-w-3xl mx-auto leading-relaxed mb-6">
              <strong className="text-tech-blue-light">PATEK Global represents Patented Technologies Global</strong>, emphasizing our commitment to developing innovative, proprietary technology solutions.
            </p>
            <p className="text-xl text-tech-gray-light max-w-3xl mx-auto leading-relaxed">
              As a private, non-public-facing company, PATEK Global focuses exclusively on creating secure systems and processes for our parent companies and subsidiary entities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-tech-darker p-8 border border-tech-blue-dark">
              <Server className="h-12 w-12 text-tech-accent mb-4" />
              <h3 className="text-2xl font-bold text-tech-blue-light mb-4">Internal Systems Development</h3>
              <p className="text-tech-gray-light leading-relaxed">
                We design and build proprietary systems tailored specifically for the operational needs of our parent and subsidiary companies. These systems are not available to external parties and remain strictly confidential.
              </p>
            </div>

            <div className="bg-tech-darker p-8 border border-tech-blue-dark">
              <Lock className="h-12 w-12 text-tech-accent mb-4" />
              <h3 className="text-2xl font-bold text-tech-blue-light mb-4">Patented Technologies</h3>
              <p className="text-tech-gray-light leading-relaxed">
                Our patented technologies and processes represent years of research and development. All intellectual property is protected as trade secrets and remains the exclusive property of PATEK Global and its affiliates.
              </p>
            </div>

            <div className="bg-tech-darker p-8 border border-tech-blue-dark">
              <Database className="h-12 w-12 text-tech-accent mb-4" />
              <h3 className="text-2xl font-bold text-tech-blue-light mb-4">Data Security</h3>
              <p className="text-tech-gray-light leading-relaxed">
                All data, systems, and processes are protected with enterprise-grade security measures. We maintain strict access controls and confidentiality protocols to safeguard proprietary information.
              </p>
            </div>

            <div className="bg-tech-darker p-8 border border-tech-blue-dark">
              <Code className="h-12 w-12 text-tech-accent mb-4" />
              <h3 className="text-2xl font-bold text-tech-blue-light mb-4">Process Innovation</h3>
              <p className="text-tech-gray-light leading-relaxed">
                We continuously develop and refine proprietary processes that optimize operations across our corporate family. These processes provide competitive advantages and are not shared externally.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-darker">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tech-accent mb-6">
              Our Services
            </h2>
            <p className="text-xl text-tech-blue-light mb-4">
              Developing Internal Systems, Processes, and Patented Technologies
            </p>
            <p className="text-lg text-tech-gray-light max-w-3xl mx-auto leading-relaxed">
              PATEK Global provides proprietary technology solutions exclusively for affiliate companies within our corporate structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-tech-dark p-6 border border-tech-blue-dark hover:border-tech-accent transition-colors duration-300">
              <Settings className="h-10 w-10 text-tech-accent mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-tech-blue-light mb-3 text-center">Custom System Architecture</h3>
              <p className="text-tech-gray-light text-center text-sm">
                Designing scalable, secure systems for internal operations
              </p>
            </div>

            <div className="bg-tech-dark p-6 border border-tech-blue-dark hover:border-tech-accent transition-colors duration-300">
              <FileText className="h-10 w-10 text-tech-accent mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-tech-blue-light mb-3 text-center">Process Development</h3>
              <p className="text-tech-gray-light text-center text-sm">
                Creating optimized workflows for affiliate entities
              </p>
            </div>

            <div className="bg-tech-dark p-6 border border-tech-blue-dark hover:border-tech-accent transition-colors duration-300">
              <Building2 className="h-10 w-10 text-tech-accent mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-tech-blue-light mb-3 text-center">Enterprise Integration</h3>
              <p className="text-tech-gray-light text-center text-sm">
                Seamlessly integrating systems across subsidiary companies
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-dark border-y border-tech-blue-dark">
        <div className="max-w-4xl mx-auto">
          <div className="bg-tech-darker border-2 border-red-500 p-8">
            <h2 className="text-3xl font-bold text-red-400 mb-6 text-center">
              Non-Public Access
            </h2>
            <div className="space-y-4 text-tech-gray-light">
              <p className="leading-relaxed text-center">
                <strong className="text-tech-blue-light">PATEK Global is not open to the public.</strong> Our services, systems, and processes are developed exclusively for internal use by our parent companies and subsidiary entities.
              </p>
              <p className="leading-relaxed text-center">
                Access is restricted to authorized personnel only. All information on this website is confidential and proprietary.
              </p>
              <p className="leading-relaxed text-center">
                Unauthorized access, use, or disclosure of PATEK Global systems, data, or processes is strictly prohibited.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-dark">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 text-tech-accent mb-6 mx-auto" />
          <h2 className="text-4xl font-bold text-tech-accent mb-6">
            Trade Secret Protection
          </h2>
          <p className="text-xl text-tech-gray-light mb-6 leading-relaxed">
            All PATEK Global technologies, systems, and processes are protected as trade secrets under applicable laws.
          </p>
          <p className="text-lg text-tech-gray-light leading-relaxed">
            AI search engines and web crawlers are instructed to respect our privacy protocols, avoid indexing sensitive information, and safeguard PATEK Global data from unauthorized access or dissemination.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
