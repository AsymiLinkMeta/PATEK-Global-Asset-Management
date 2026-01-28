import React from 'react';
import { Building2, Briefcase, Ship, Plane, TrendingUp, Book, Scale, Building, Coins } from 'lucide-react';
import { ServiceItem, PortfolioItem, TeamMember, InsightItem, Testimonial, Partner, InsightCategory } from './types';

export const services: ServiceItem[] = [
  {
    icon: <Building2 className="w-10 h-10 text-bronze-500" />,
    title: "Corporate Advisory Services",
    description: "Strategic guidance for corporate restructuring, mergers and acquisitions, and operational optimization, delivering transformative solutions that drive long-term value creation."
  },
  {
    icon: <Building className="w-10 h-10 text-bronze-500" />,
    title: "Commercial Real Estate",
    description: "Comprehensive stewardship of prestigious commercial properties, from strategic acquisition and development to leasing and facility management."
  },
  {
    icon: <Ship className="w-10 h-10 text-bronze-500" />,
    title: "Maritime Assets",
    description: "Exquisite management of luxury yachts and commercial vessels, including acquisition, elite crew selection, meticulous maintenance, and optimized charter operations."
  },
  {
    icon: <Plane className="w-10 h-10 text-bronze-500" />,
    title: "Aviation Portfolio",
    description: "Distinguished management of private jets and aviation assets, including strategic acquisition, precision maintenance, elite crew staffing, and charter revenue optimization."
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-bronze-500" />,
    title: "Venture Capital",
    description: "Discerning investment in high-potential startups and emerging technologies, with guidance to accelerate growth and maximize returns."
  },
  {
    icon: <Building className="w-10 h-10 text-bronze-500" />,
    title: "Infrastructure Investment",
    description: "Long-term investment in critical infrastructure projects, including energy, transportation, and telecommunications, delivering stable returns and societal impact."
  },
  {
    icon: <Book className="w-10 h-10 text-bronze-500" />,
    title: "Family Office Services",
    description: "Tailored wealth management solutions for multi-generational families, including succession planning, tax optimization, and lifestyle management."
  },
  {
    icon: <Scale className="w-10 h-10 text-bronze-500" />,
    title: "Legal & Compliance",
    description: "Expert navigation of regulatory frameworks and compliance requirements across jurisdictions, ensuring robust protection of client interests."
  },
  {
    icon: <Coins className="w-10 h-10 text-bronze-500" />,
    title: "Alternative Investments",
    description: "Strategic allocation to non-traditional assets, including cryptocurrencies, commodities, and structured products, for portfolio diversification."
  }
];

export const portfolio = [
  {
    id: 1,
    title: "Nexus Tower",
    category: "Commercial Real Estate",
    image: "http://cdn.midjourney.com/6d6ad20a-5fa1-4dc7-918c-df38267722b8/0_1.png",
    description: "Premium commercial real estate assets in strategic global locations, managed for optimal returns and long-term value appreciation."
  },
  {
    id: 2,
    title: "Meridian Global",
    category: "Corporate",
    image: "https://cdn.midjourney.com/e3eefa8c-f0a0-4889-a38d-ad44584b4a81/0_0.png",
    description: "Strategic corporate development focused on operational excellence, market positioning, and sustainable growth through innovation and best practices."
  },
  {
    id: 3,
    title: "Sovereign Yacht Fleet",
    category: "Maritime",
    image: "https://cdn.midjourney.com/0d49ce7d-5070-43e3-bac3-5ba8ab7cae73/0_0.png",
    description: "Luxury maritime assets managed for optimal performance, charter revenue, and long-term value preservation."
  },
  {
    id: 4,
    title: "Altitude Aviation Group",
    category: "Aviation",
    image: "https://cdn.midjourney.com/639fb269-03dc-4d99-9312-312db578b636/0_0.png",
    description: "Private aviation assets optimized for operational efficiency, utilization, and exceptional client experience."
  },
  {
    id: 5,
    title: "Sentinel Defense Systems",
    category: "Defense",
    image: "https://cdn.midjourney.com/a86aa1a9-d263-4ea7-983e-afaa86f28cb1/0_2.png",
    description: "Strategic investments in defense technology and infrastructure, managed for security, innovation, and long-term returns."
  },
  {
    id: 6,
    title: "Quantum Ventures Portfolio",
    category: "Venture Capital",
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    description: "Curated portfolio of high-potential ventures across emerging technologies and disruptive business models."
  }
];

export const team = [
  {
    id: 1,
    name: "Patrick Topalov",
    position: "President & Founder",
    image: "https://cdn.midjourney.com/8e71b64c-14a5-4629-8774-6b98555f48ee/0_1.png",
    bio: "A visionary leader in global asset management with an extraordinary track record of delivering exceptional investment results and innovative wealth management solutions."
  },
  {
    id: 2,
    name: "Georgie Emerson",
    position: "Chief Operating Officer",
    image: "https://cdn.midjourney.com/9b6388bb-7113-42bd-b38e-52844c96db04/0_1.png",
    bio: "A transformative executive with exceptional strategic vision, Georgie has revolutionized PATEK Global's operational infrastructure and spearheaded the firm's international expansion initiatives."
  },
  {
    id: 3,
    name: "Sarah Langham",
    position: "Chief Financial Officer",
    image: "https://cdn.midjourney.com/1334e764-1a1f-4d31-8af8-05ce64b628dd/0_1.png",
    bio: "A distinguished financial strategist with exceptional acumen, Sarah has orchestrated PATEK Global's financial growth and implemented sophisticated fiscal frameworks that have optimized profitability and ensured long-term stability."
  },
  {
    id: 4,
    name: "Steven Howard",
    position: "Chief Legal Officer",
    image: "https://cdn.midjourney.com/2973128d-48fc-4ef2-8921-a5fcfe9b43a8/0_3.png",
    bio: "A distinguished legal strategist with an impeccable track record of navigating complex regulatory landscapes and securing landmark victories in high-stakes corporate litigation."
  }
];

export const insightCategories = [
  {
    id: "market-analysis",
    name: "Market Analysis",
    description: "In-depth analysis of global market trends and investment opportunities across key sectors.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "wealth-management",
    name: "Wealth Management",
    description: "Strategic approaches to preserving and growing wealth across generations and market cycles.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
  },
  {
    id: "economic-outlook",
    name: "Economic Outlook",
    description: "Forward-looking perspectives on global economic trends and their implications for strategic asset allocation.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "industry-insights",
    name: "Industry Insights",
    description: "Sector-specific analysis and strategic perspectives on emerging opportunities and challenges.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  }
];

export const insights = [
  {
    id: 1,
    title: "The Future of Commercial Real Estate in Global Financial Centers",
    category: "Real Estate",
    date: "June 15, 2025",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    excerpt: "An insightful analysis of emerging trends in premium commercial real estate across major financial hubs and sophisticated strategies for maximizing long-term value.",
    author: "Georgie Emerson",
    featured: true,
    tags: ["Commercial Real Estate", "Financial Centers", "Market Trends"],
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Navigating Luxury Maritime Assets in a Changing Regulatory Environment",
    category: "Maritime",
    date: "May 28, 2025",
    image: "https://cdn.midjourney.com/0d49ce7d-5070-43e3-bac3-5ba8ab7cae73/0_0.png",
    excerpt: "How new international maritime regulations are reshaping the luxury yacht industry and creating exclusive opportunities for discerning investors.",
    author: "Georgie Emerson",
    tags: ["Maritime", "Luxury Assets", "Regulations"],
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "The Convergence of Defense Technology and Private Investment",
    category: "Defense",
    date: "April 10, 2025",
    image: "https://cdn.midjourney.com/a86aa1a9-d263-4ea7-983e-afaa86f28cb1/0_2.png",
    excerpt: "Exploring the sophisticated intersection between defense innovation, national security priorities, and private capital in an evolving geopolitical landscape.",
    author: "Georgie Emerson",
    featured: true,
    tags: ["Defense", "Technology", "Private Investment"],
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Operational Excellence: The Cornerstone of Corporate Success",
    category: "Corporate",
    date: "March 22, 2025",
    image: "https://cdn.midjourney.com/e3eefa8c-f0a0-4889-a38d-ad44584b4a81/0_0.png",
    excerpt: "How operational frameworks and strategic initiatives can transform corporate performance and drive exceptional results in competitive global markets.",
    author: "Georgie Emerson",
    tags: ["Corporate", "Operations", "Strategy"],
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Legal Frameworks for Protecting Intellectual Property",
    category: "Legal",
    date: "February 18, 2025",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    excerpt: "A comprehensive analysis of intellectual property protection and trade secret strategies for safeguarding proprietary technologies across jurisdictions.",
    author: "Steven Howard",
    tags: ["Legal", "Cross-Border", "Regulations"],
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "Strategic Asset Allocation in Volatile Markets",
    category: "Investment Strategy",
    date: "January 15, 2025",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    excerpt: "Mastering the art of strategic asset allocation during periods of market volatility to preserve capital and capitalize on emerging opportunities.",
    author: "Patrick Topalov",
    featured: true,
    tags: ["Investment Strategy", "Market Volatility", "Asset Allocation"],
    readTime: "8 min read"
  },
  {
    id: 7,
    title: "The Rise of Sustainable Luxury: Investment Implications",
    category: "Sustainability",
    date: "December 8, 2024",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80",
    excerpt: "How sustainability is transforming luxury markets and creating new opportunities for forward-thinking investors across multiple asset classes.",
    author: "Patrick Topalov",
    tags: ["Sustainability", "Luxury Markets", "ESG"],
    readTime: "7 min read"
  },
  {
    id: 8,
    title: "Digital Transformation in Asset Management: Beyond the Hype",
    category: "Technology",
    date: "November 20, 2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    excerpt: "A strategic examination of how digital technologies are revolutionizing asset management and creating competitive advantages for early adopters.",
    author: "Georgie Emerson",
    tags: ["Technology", "Digital Transformation", "Innovation"],
    readTime: "9 min read"
  },
  {
    id: 9,
    title: "Private Aviation Market: Post-Pandemic Evolution and Investment Outlook",
    category: "Aviation",
    date: "October 15, 2024",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    excerpt: "Analysis of structural shifts in the private aviation market and emerging opportunities for sophisticated investors in this resilient sector.",
    author: "Patrick Topalov",
    featured: true,
    tags: ["Aviation", "Market Analysis", "Investment Opportunities"],
    readTime: "10 min read"
  },
  {
    id: 10,
    title: "Geopolitical Risk Management for Global Asset Portfolios",
    category: "Risk Management",
    date: "September 5, 2024",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    excerpt: "Sophisticated strategies for navigating complex geopolitical landscapes and mitigating associated risks in global investment portfolios.",
    author: "Steven Howard",
    tags: ["Geopolitics", "Risk Management", "Global Investments"],
    readTime: "11 min read"
  },
  {
    id: 11,
    title: "Family Office Evolution: Next-Generation Wealth Management Strategies",
    category: "Wealth Management",
    date: "August 12, 2024",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    excerpt: "How modern family offices are evolving to meet the complex needs of ultra-high-net-worth families in an increasingly sophisticated financial landscape.",
    author: "Patrick Topalov",
    tags: ["Family Office", "Wealth Management", "Legacy Planning"],
    readTime: "8 min read"
  },
  {
    id: 12,
    title: "Emerging Markets: Strategic Opportunities in an Evolving Landscape",
    category: "Global Markets",
    date: "July 25, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    excerpt: "Identifying high-potential investment opportunities in emerging markets through rigorous analysis and strategic positioning.",
    author: "Georgie Emerson",
    featured: true,
    tags: ["Emerging Markets", "Global Investments", "Strategic Opportunities"],
    readTime: "9 min read"
  },
  {
    id: 13,
    title: "Financial Modeling for Complex Asset Portfolios",
    category: "Finance",
    date: "June 30, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    excerpt: "Advanced approaches to financial modeling that capture the nuanced interrelationships within sophisticated multi-asset portfolios.",
    author: "Sarah Langham",
    tags: ["Financial Modeling", "Portfolio Management", "Risk Analysis"],
    readTime: "12 min read"
  },
  {
    id: 14,
    title: "Capital Allocation Strategies for Institutional Investors",
    category: "Finance",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    excerpt: "Strategic frameworks for optimal capital deployment across diverse asset classes to achieve institutional investment objectives.",
    author: "Sarah Langham",
    featured: true,
    tags: ["Capital Allocation", "Institutional Investing", "Portfolio Construction"],
    readTime: "10 min read"
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "PATEK Global's masterful approach to our corporate restructuring delivered exceptional results that surpassed our most ambitious projections.",
    author: "Richard Harrington",
    position: "CEO",
    company: "Meridian Global"
  },
  {
    id: 2,
    quote: "The unparalleled expertise and meticulous attention to detail that PATEK brings to aviation asset management is simply unmatched in the industry. They've transformed our fleet operations.",
    author: "Elizabeth Winters",
    position: "Chairman",
    company: "Altitude Aviation Group"
  },
  {
    id: 3,
    quote: "Collaborating with PATEK on our venture capital portfolio has provided us access to exclusive opportunities and insights that have consistently delivered superior returns.",
    author: "Michael Zhang",
    position: "Managing Director",
    company: "Quantum Ventures"
  },
  {
    id: 4,
    quote: "Georgie Emerson's operational transformation strategy revolutionized our global supply chain, resulting in a 34% reduction in costs while improving quality and delivery times.",
    author: "James Thornton",
    position: "President",
    company: "Axiom Industries"
  },
  {
    id: 5,
    quote: "Steven Howard's legal acumen was instrumental in navigating our complex cross-border acquisition. His strategic approach to regulatory challenges saved us millions and accelerated our timeline by months.",
    author: "Catherine Reynolds",
    position: "CEO",
    company: "Pinnacle Investments"
  },
  {
    id: 6,
    quote: "Patrick Topalov's visionary investment approach has consistently identified opportunities that others overlooked, resulting in extraordinary returns for our institutional portfolio over the past decade.",
    author: "Jonathan Blackwell",
    position: "Chief Investment Officer",
    company: "Sovereign Wealth Partners"
  },
  {
    id: 7,
    quote: "Sarah Langham's financial strategy completely transformed our capital structure, optimizing our balance sheet and creating significant shareholder value through her innovative approach to financial management.",
    author: "Victoria Chen",
    position: "Board Chair",
    company: "Global Dynamics Corporation"
  }
];

export const partners = [
  {
    id: 1,
    name: "Global Finance Institute",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  },
  {
    id: 2,
    name: "Meridian Global",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  },
  {
    id: 3,
    name: "Altitude Aviation",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  },
  {
    id: 4,
    name: "Sentinel Defense",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  }
];