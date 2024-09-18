import React from 'react';

export interface NavLink {
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

export interface SidebarLink {
  name: string;
  href: string;
}

export interface SidebarProperties {
  backgroundColor: string;
  color: string;
  links: SidebarLink[];
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
  backgroundColor: string;
  color: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  buttonText: string;
  buttonAction: () => void;
}

export interface PricingCard {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  signUpHref: string;
  buttonColor: string;
}

export interface PricingCardProperties {
  backgroundColor: string;
  color: string;
  title: string;
  cards: PricingCard[];
  buttonColor: string;
}

export type AdvancedPredefinedComponentType = 'navbar' | 'sidebar' | 'heroSection' | 'card' | 'pricingCards';

export interface AdvancedPredefinedComponent<T> {
  type: AdvancedPredefinedComponentType;
  name: string;
  Component: ({ properties }: { properties: T }) => JSX.Element;
  properties: T;
}


export const advancedPredefinedComponents: Record<AdvancedPredefinedComponentType, AdvancedPredefinedComponent<any>> = {
  navbar: {
    type: 'navbar',
    name: 'Navbar',
    Component: ({ properties }: { properties: NavbarProperties }) => {
      const {
        backgroundColor, color, logo, links, flexDirection, justifyContent, alignItems,
      } = properties;

      return (
        <nav style={{
          backgroundColor,
          color,
          display: 'flex',
          flexDirection,
          justifyContent,
          alignItems,
          padding: '10px',
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: 'auto' }}>
            {logo}
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            {links.map((link, index) => (
              <a key={index} href={link.href} style={{
                color,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      );
    },
    properties: {
      backgroundColor: '#333',
      color: '#fff',
      logo: 'My Logo',
      links: [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
      ],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  sidebar: {
    type: 'sidebar',
    name: 'Sidebar',
    Component: ({ properties }: { properties: SidebarProperties }) => {
      const {
        backgroundColor, color, links, flexDirection, justifyContent, alignItems,
      } = properties;

      return (
        <aside style={{
          backgroundColor,
          color,
          width: '250px',
          padding: '20px',
          position: 'fixed',
          height: '100%',
          display: 'flex',
          flexDirection,
          justifyContent,
          alignItems,
        }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {links.map((link, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <a href={link.href} style={{
                  color,
                  textDecoration: 'none',
                  fontSize: '1rem',
                }}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      );
    },
    properties: {
      backgroundColor: '#f4f4f4',
      color: '#333',
      links: [
        { name: 'Dashboard', href: '#' },
        { name: 'Profile', href: '#' },
        { name: 'Settings', href: '#' },
      ],
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
  },

  heroSection: {
    type: 'heroSection',
    name: 'Hero Section',
    Component: ({ properties }: { properties: HeroSectionProperties }) => {
      const {
        backgroundImage, title, subtitle, buttonText, onClick,
      } = properties;

      return (
        <section style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '100px 20px',
        }}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <button onClick={onClick} style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}>
            {buttonText}
          </button>
        </section>
      );
    },
    properties: {
      backgroundImage: 'https://via.placeholder.com/1200x400',
      title: 'Welcome to Our Site',
      subtitle: 'We provide the best services just for you',
      buttonText: 'Click Me',
      onClick: () => alert('Button clicked!'),
    },
  },

  card: {
    type: 'card',
    name: 'Card',
    Component: ({ properties }: { properties: CardProperties }) => {
      const {
        backgroundColor, color, title, subtitle, content, image, buttonText, buttonAction,
      } = properties;

      return (
        <div style={{
          backgroundColor,
          color,
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          maxWidth: '300px',
          textAlign: 'center',
          margin: '10px',
        }}>
          {image && <img src={image} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />}
          <h3>{title}</h3>
          {subtitle && <h4>{subtitle}</h4>}
          <p>{content}</p>
          <button onClick={buttonAction} style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            {buttonText}
          </button>
        </div>
      );
    },
    properties: {
      backgroundColor: '#fff',
      color: '#333',
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      content: 'Card content goes here.',
      image: '',
      buttonText: 'Action',
      buttonAction: () => alert('Button clicked!'),
    },
  },

  pricingCards: {
    type: 'pricingCards',
    name: 'Pricing Cards',
    Component: ({ properties }: { properties: PricingCardProperties }) => {
      const {
        backgroundColor, color, title, cards, buttonColor,
      } = properties;

      return (
        <section style={{ padding: '20px', backgroundColor, color }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {cards.map((card, index) => (
              <div key={index} style={{
                flex: '1 1 300px',
                margin: '10px',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}>
                <h3 style={{ margin: '10px 0' }}>{card.title}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{card.price}</p>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '10px 0' }}>
                  {card.features.map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: '5px' }}>{feature}</li>
                  ))}
                </ul>
                <a href={card.signUpHref} style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: card.buttonColor,
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                }}>{card.buttonText}</a>
              </div>
            ))}
          </div>
        </section>
      );
    },
    properties: {
      backgroundColor: '#f9f9f9',
      color: '#333',
      title: 'Our Pricing Plans',
      cards: [
        {
          title: 'Basic Plan',
          price: '$10/month',
          features: ['Feature 1', 'Feature 2'],
          buttonText: 'Sign Up',
          signUpHref: '#basic',
          buttonColor: '#28a745',
        },
        {
          title: 'Pro Plan',
          price: '$20/month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          buttonText: 'Get Started',
          signUpHref: '#pro',
          buttonColor: '#ffc107',
        },
      ],
      buttonColor: '#007bff',
    },
  },
};
