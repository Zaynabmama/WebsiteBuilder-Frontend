import Footer from './FooterSection';

export type PredefinedComponentType = {
  [key: string]: React.ComponentType<{ properties: React.CSSProperties }>;
};

export const predefinedComponents: PredefinedComponentType = {
  footer: Footer,

};
