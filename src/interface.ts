export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type JustifyContent = 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'space-between' 
  | 'space-around' 
  | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export interface FooterProperties {
  backgroundColor: string;
  color: string;
  links: { text: string; href: string }[];
}

export interface NavbarProperties {
  backgroundColor: string;
  color: string;
  logo: string;
  links: { name: string; href: string }[];
  flexDirection: FlexDirection; 
  justifyContent: JustifyContent;
  alignItems: AlignItems;
}
export interface HeroSectionProperties {
    backgroundColor: string;
    color: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
  }
  export interface ServiceProperties {
    backgroundColor: string;
    color: string;
    title: string;
    description: string;
    services:[], 
    flexDirection: FlexDirection;
    justifyContent: JustifyContent;
    alignItems: AlignItems; 
    borderRadius?: string; 
    borderColor?: string; 
  }
  export interface TestimonialProperties {
    backgroundColor: string;
    color: string;
    title: string;
    testimonials: {
      name: string;
      position: string;
      text: string;
    }[];
    flexDirection: FlexDirection;
    justifyContent: JustifyContent;
    alignItems: AlignItems;
  }
  
  export interface PricingCard {
    title: string;
    price: string;
    features: string[];
    buttonText: string;
    buttonHref: string;
    buttonColor: string;
  }
  
  export interface PricingTableProperties {
    backgroundColor: string;
    color: string;
    title: string;
    cards: PricingCard[];
  }

export interface AdvancedPredefinedComponent<T> {
  type: 'footer' | 'navbar' | 'heroSection'|'service'|  'testimonial'| 'pricingTable';
  name: string;
  Component: ({ properties }: { properties: T }) => JSX.Element;
  properties: T;
}
  export type AdvancedPredefinedComponentType =
  | 'navbar'
  | 'footer'
  | 'heroSection'
  |'service'
  | 'testimonial'
  | 'pricingTable';
