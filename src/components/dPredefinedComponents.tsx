
import {
  AdvancedPredefinedComponentType,
  FooterProperties,
  NavbarProperties,
  HeroSectionProperties,
  AdvancedPredefinedComponent,
} from "@/interface";
 import styles from '../styles/HeroSection.module.css'
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
        <nav style={{ backgroundColor, color, display: 'flex', flexDirection, justifyContent, alignItems, padding: '10px' }}>
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
  };