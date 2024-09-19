import { ReactNode } from "react";

export interface NavLink {
    text: ReactNode;
    name: string;
    href: string;
  }
  
  export interface NavbarProperties {
    backgroundColor: string;
    color: string;
    logo: string;
    links: NavLink[];
    flexDirection: 'row' | 'column';
    justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  }
  

  
  export interface HeroSectionProperties {
    backgroundImage: string;
    title: string;
    subtitle: string;
    buttonText: string;
    onClick: () => void;
  }
  
  export interface CardProperties {
    backgroundColor?: string;
    color?: string;
    title: string;
    content: string;
    buttonText?: string;
    buttonAction?: () => void;
  }
  
  export interface Card {
    title: string;
    price: string;
    features: string[];
    buttonText: string;
    signUpHref: string;
    buttonColor: string;
  }
  
  export interface PricingCardProperties {
    backgroundColor?: string;
    color?: string;
    title: string;
    price: string;
    features: string[];
    buttonText: string;
    buttonAction: () => void;
  }
  
  export interface Testimonial {
    name: string;
    feedback: string;
  }
  
  export interface TestimonialSectionProperties {
    backgroundColor?: string;
    color?: string;
    testimonials: Testimonial[];
  }
  export interface TeamMember {
    name: string;
    role: string;
    bio: string;
  }
  
  export interface TeamSectionProperties {
    backgroundColor?: string;
    color?: string;
    team: TeamMember[];
  }
  
  export interface ContactFormProperties {
    backgroundColor?: string;
    color?: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderMessage: string;
    submitButtonText: string;
  }
  
  export interface FooterProperties {
    backgroundColor?: string;
    color?: string;
    links: NavLink[];
  }

  
  export interface BlogPost {
    href?: string;
    title: string;
    excerpt: string;
  }
  
  export interface BlogSectionProperties {
    backgroundColor?: string;
    color?: string;
    posts: BlogPost[];
  }
  
  export interface StatsProperties {
    stats: { label: string; value: string }[];
  }
  
  export interface FeaturesProperties {
    features: { icon: string; title: string; description: string }[];
  }
  
  export type AdvancedPredefinedComponentType =
  | 'navbar'
  | 'heroSection'
  | 'card'
  | 'pricingCards'
  | 'testimonialSection'
  | 'teamSection'
  | 'contactForm'
  | 'footer'
  | 'blogSection'
  | 'stats'
  | 'features';
  