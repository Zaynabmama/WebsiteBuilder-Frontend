
import {
  AdvancedPredefinedComponentType,
  FooterProperties,
  NavbarProperties,
  HeroSectionProperties,
  AdvancedPredefinedComponent,
  ServiceProperties,
  TestimonialProperties,
} from "@/interface";
 import styles from '../styles/HeroSection.module.css'
 import ServiceComponent from './Service';
export const advancedPredefinedComponents: Record<AdvancedPredefinedComponentType, AdvancedPredefinedComponent<any>> = {
  footer: {
    type: 'footer',
    name: 'Footer',
    Component: ({ properties }: { properties: FooterProperties }) => {
      const { backgroundColor, color, links } = properties;

      return (
        <footer style={{ backgroundColor, color, padding: '20px 0', textAlign: 'center' }}>
          <nav>
            <ul style={{ display: 'flex', justifyContent: 'center', listStyleType: 'none', padding: 0 }}>
              {links.map((link, index) => (
                <li key={index} style={{ margin: '0 15px' }}>
                  <a href={link.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      );
    },
    properties: {
      backgroundColor: '#333',
      color: '#fff',
      links: [
        { text: 'Home', href: '#home' },
        { text: 'About', href: '#about' },
        { text: 'Services', href: '#services' },
        { text: 'Contact', href: '#contact' },
      ],
    },
  },
  
  navbar: {
    type: 'navbar',
    name: 'Navbar',
    Component: ({ properties }: { properties: NavbarProperties }) => {
      const { backgroundColor, color, logo, links=[], flexDirection, justifyContent, alignItems } = properties;

      return (
        <nav style={{ backgroundColor, color, display: 'flex', flexDirection, justifyContent, alignItems, padding: '5px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: 'auto' }}>
            {logo}
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            {links.map((link, index) => (
              <a key={index} href={link.href} style={{ color, textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>
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
    heroSection: {
      type: 'heroSection',
      name: 'Hero Section',
      Component: ({ properties }: { properties: HeroSectionProperties }) => {
        const { backgroundColor, color, title, subtitle, buttonText, buttonHref } = properties;
  
        return (
          <section className={styles.heroSection} style={{ backgroundColor, color }}>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroSubtitle}>{subtitle}</p>
            <a href={buttonHref} className={styles.heroButton}>
              {buttonText}
            </a>
          </section>
        );
      },
      properties: {
        backgroundColor: '#4A90E2', 
        color: '#FFFFFF',
        title: 'Transform Your Ideas into Reality',
        subtitle: 'Discover innovative solutions and take your business to the next level with our expertise and support.',
        buttonText: 'Get Started',
        buttonHref: '#get-started',
      },
    },
    service: { 
      type: 'service',
      name: 'Service',
      Component: ({ properties }: { properties: ServiceProperties }) => (
        <ServiceComponent properties={properties} />
      ),
      properties: {
        backgroundColor: '#f9f9f9',
        color: '#333',               
        services: [
          {
            title: 'Service 1',
            description: 'Description for service 1.',
            features: [
              'Feature 1: High Quality',
              'Feature 2: Reliable Support',
              'Feature 3: Affordable Pricing',
            ],
          },
          {
            title: 'Service 2',
            description: 'Description for service 2.',
            features: [
              'Feature 1: Fast Delivery',
              'Feature 2: Excellent Customer Service',
              'Feature 3: Custom Solutions',
            ],
          },
          {
            title: 'Service 3',
            description: 'Description for service 3.',
            features: [
              'Feature 1: Expert Team',
              'Feature 2: Innovative Ideas',
              'Feature 3: Guaranteed Satisfaction',
            ],
          },
         
        ],
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    },
    testimonial: {
      type: 'testimonial',
      name: 'Testimonial',
      Component: ({ properties }: { properties: TestimonialProperties }) => {
        const { color, title, testimonials, flexDirection, justifyContent, alignItems } = properties;
  
        return (
          <section style={{
           
            color,
            display: 'flex',
            flexDirection,
            justifyContent,
            alignItems,
          
          }}>
            <h2 style={{ marginBottom: '10px' }}>{title}</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
            }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} style={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  padding: '20px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}>
                  <h3 style={{ margin: '0 0 10px' }}>{testimonial.name}</h3>
                  <h4 style={{ margin: '0 0 15px', fontWeight: 'normal', color: '#666' }}>{testimonial.position}</h4>
                  <p>{testimonial.text}</p>
                </div>
              ))}
            </div>
          </section>
        );
      },
      properties: {
        backgroundColor: '#f3f4f6',
        color: '#333',
        title: 'What Our Clients Say',
        testimonials: [
          {
            name: 'John Doe',
            position: 'CEO, Company A',
            text: 'This service transformed our business!',
          },
          {
            name: 'Jane Smith',
            position: 'CTO, Company B',
            text: 'Outstanding support and results!',
          },
          {
            name: 'Alice Johnson',
            position: 'Marketing Director, Company C',
            text: 'A game-changer for our team!',
          },
        ],
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
  };