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
  export interface ButtonProperties {
    text: string;
    onClick: () => void;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
  }
  
  export interface InputProperties {
    placeholder: string;
    type: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    backgroundColor?: string;
    color?: string;
  }
  

  export interface ContactUsProperties {
    backgroundColor: string;
    color: string;
    title: string;
    description: string;
    fields: { label: string; type: string; name: string }[];
    submitText: string;
  }
  

  export interface FAQProperties {
    backgroundColor: string;
    color: string;
    questions: { question: string; answer: string }[];
  }
  

  export interface CardProperties {
    backgroundColor: string;
    title: string;
    content: string;
    buttonText?: string;
    buttonHref?: string;
    buttonColor?: string;
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
    description: string;
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
  export interface TeamMember {
    name: string;
    position: string;
    photoUrl: string;
    description: string;
  }
  
  export interface TeamSectionProperties {
    backgroundColor: string;
    color: string;
    title: string;
    members: TeamMember[];
    flexDirection: FlexDirection;
    justifyContent: JustifyContent;
    alignItems: AlignItems;
  }
  

  export interface AdvancedPredefinedComponent<T> {
    type: 'button' | 'input' | 'footer' | 'navbar' | 'heroSection' | 'service' | 'testimonial' | 'pricingTable' | 'teamSection' | 'contactUs' | 'faq' | 'card';
    name: string;
    Component: ({ properties }: { properties: T }) => JSX.Element;
    properties: T;
  }
  export type AdvancedPredefinedComponentType =
  | 'button'
  | 'input'
  | 'footer'
  | 'navbar'
  | 'heroSection'
  | 'service'
  | 'testimonial'
  | 'pricingTable'
  | 'teamSection'
  | 'contactUs'
  | 'faq'
  | 'card';