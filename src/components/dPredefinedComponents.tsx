import React from 'react';

export type AdvancedPredefinedComponentType =
  | 'header'
  | 'footer'
  | 'contactUs'
  | 'heroSection'
  | 'card'
  | 'testimonial'
  | 'feature'
  | 'blogPost';

export interface AdvancedPredefinedComponent {
  type: AdvancedPredefinedComponentType;
  name: string;
  Component: React.FC<{ style?: React.CSSProperties }>;  
  properties: React.CSSProperties;
}

export const advancedPredefinedComponents: Record<AdvancedPredefinedComponentType, AdvancedPredefinedComponent> = {
  header: {
    type: 'header',
    name: 'Header',
    Component: (props) => <header style={props.style}>Header Content</header>,
    properties: {
      backgroundColor: '#f8f9fa',
      color: '#000',
      padding: '20px',
      textAlign: 'center',
    },
  },
  footer: {
    type: 'footer',
    name: 'Footer',
    Component: (props) => <footer style={props.style}>© 2024 Your Company</footer>,
    properties: {
      backgroundColor: '#333',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
    },
  },
  contactUs: {
    type: 'contactUs',
    name: 'Contact Us',
    Component: (props) => (
      <section style={props.style}>
        <h2>Contact Us</h2>
        <p>Email: contact@company.com</p>
        <p>Phone: +123 456 7890</p>
      </section>
    ),
    properties: {
      backgroundColor: '#f1f1f1',
      color: '#000',
      padding: '20px',
      textAlign: 'center',
    },
  },
  heroSection: {
    type: 'heroSection',
    name: 'Hero Section',
    Component: (props) => (
      <section style={props.style}>
        <h1>Welcome to Our Website</h1>
        <p>Building websites made easy with drag-and-drop!</p>
      </section>
    ),
    properties: {
      backgroundColor: '#282c34',
      color: '#fff',
      padding: '40px',
      textAlign: 'center',
    },
  },
  card: {
    type: 'card',
    name: 'Card',
    Component: (props) => (
      <div style={props.style}>
        <h3>Card Title</h3>
        <p>Some card content goes here. It’s simple and effective.</p>
      </div>
    ),
    properties: {
      borderColor: '#ddd',
      padding: '20px',
      borderRadius: '8px',
    },
  },
  testimonial: {
    type: 'testimonial',
    name: 'Testimonial',
    Component: (props) => (
      <blockquote style={props.style}>
        "This product changed my life!" - Happy Customer
      </blockquote>
    ),
    properties: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      fontStyle: 'italic',
    },
  },
  feature: {
    type: 'feature',
    name: 'Feature Section',
    Component: (props) => (
      <section style={props.style}>
        <h2>Amazing Feature</h2>
        <p>Our product has an amazing feature that you’ll love.</p>
      </section>
    ),
    properties: {
      backgroundColor: '#e9ecef',
      padding: '20px',
      textAlign: 'center',
    },
  },
  blogPost: {
    type: 'blogPost',
    name: 'Blog Post',
    Component: (props) => (
      <article style={props.style}>
        <h2>How to Build a Website</h2>
        <p>Building a website is easier than you think! In this post, we’ll show you how.</p>
      </article>
    ),
    properties: {
      backgroundColor: '#fff',
      color: '#000',
      padding: '20px',
      textAlign: 'left',
    },
  },
};
