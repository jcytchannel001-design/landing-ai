export interface HeroConfig {
  badge: string;
  headline: string;
  accentWord: string;
  headlineLine2?: string;
  headlineAccent: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustText: string;
  statBadge: { value: string; label: string; sublabel: string };
  images: [string, string, string];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  detail: string;
  iconName: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  cat: string;
  span?: string;
}

export interface WhyUsConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  features: Array<{ title: string; desc: string }>;
  statBadge: { value: string; label: string; sublabel: string };
  images: [string, string];
}

export interface ProcessConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  steps: Array<{ title: string; desc: string }>;
  stripImages: string[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  initials: string;
  rating: number;
}

export interface TestimonialsConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: TestimonialItem[];
  ratingValue: string;
  ratingCount: string;
}

export interface ContactConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  phone: string;
  email: string;
  location: string;
  instagram: string;
  whatsapp: string;
  image: string;
}

export interface FooterConfig {
  description: string;
  services: string[];
  areas: string[];
  tickerPhotos: string[];
  name: string;
  whatsapp: string;
}

export interface NavbarConfig {
  brandName: string;
  links: Array<{ href: string; label: string }>;
  ctaText: string;
  primaryColor: string;
}

export interface SiteFont {
  heading: string;  // Google Font family name for headings (e.g. "Playfair Display")
  body: string;     // Google Font family name for body text (e.g. "Lato")
}

export interface SiteConfig {
  id?: string;
  font?: SiteFont;
  brand: {
    name: string;
    tagline: string;
    primaryColor: string;
    bgColor: string;
    darkColor: string;
    phone: string;
    email: string;
    location: string;
    instagram: string;
    whatsapp: string;
    city: string;
  };
  navbar: NavbarConfig;
  hero: HeroConfig;
  stats: StatItem[];
  services: ServiceItem[];
  gallery: {
    title: string;
    subtitle: string;
    photos: GalleryPhoto[];
    categories: string[];
  };
  whyUs: WhyUsConfig;
  process: ProcessConfig;
  testimonials: TestimonialsConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}
