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

export interface AdvancedPredefinedComponent<T> {
  type: 'footer' | 'navbar';
  name: string;
  Component: ({ properties }: { properties: T }) => JSX.Element;
  properties: T;
}
  export type AdvancedPredefinedComponentType =
  | 'navbar'
  | 'footer';
