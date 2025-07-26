export interface NavItem {
  name: string;
  path: string;
}

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
}

export interface InsightItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  author: string;
  featured?: boolean;
  tags?: string[];
  readTime?: string;
}

export interface InsightCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}