
import {
  AdvancedPredefinedComponentType,
  FooterProperties,
  NavbarProperties,
  HeroSectionProperties,
  AdvancedPredefinedComponent,
  ServiceProperties,
  TestimonialProperties,
  PricingTableProperties,
  TeamSectionProperties,
  ButtonProperties,
  CardProperties,
  FAQProperties,
  ContactUsProperties,
  InputProperties,

} from "@/interface";
 import styles from '../styles/HeroSection.module.css'
 import ServiceComponent from './Service';
import TeamSection from "./TeamSection";
export const advancedPredefinedComponents: Record<AdvancedPredefinedComponentType, AdvancedPredefinedComponent<any>> = {
  button: {
    type: 'button',
    name: 'Button',
    Component: ({ properties }: { properties: ButtonProperties }) => (
      <button style={{ backgroundColor: properties.backgroundColor, color: properties.color }}>
        {properties.text}
      </button>
    ),
    properties: {
      backgroundColor: '#007BFF',
      color: '#fff',
      text: 'Click Me',
    },
  },
  input: {
    type: 'input',
    name: 'Input',
    Component: ({ properties }: { properties: InputProperties }) => (
      <input type="text" placeholder={properties.placeholder} />
    ),
    properties: {
      placeholder: 'Enter text here',
    },
  },
  card: {
    type: 'card',
    name: 'Card',
    Component: ({ properties }: { properties: CardProperties }) => (
      <div style={{ backgroundColor: properties.backgroundColor }}>
        <h3>{properties.title}</h3>
        <p>{properties.content}</p>
        {properties.buttonText && (
          <a href={properties.buttonHref} style={{ backgroundColor: properties.buttonColor }}>
            {properties.buttonText}
          </a>
        )}
      </div>
    ),
    properties: {
      backgroundColor: '#fff',
      title: 'Sample Card Title',
      content: 'This is a sample card content.',
      buttonText: 'Learn More',
      buttonHref: '#',
      buttonColor: '#007BFF',
    },
  },

  contactUs: {
    type: 'contactUs',
    name: 'Contact Us',
    Component: ({ properties }: { properties: ContactUsProperties }) => (
      <div>
        <h2>{properties.title}</h2>
       
      </div>
    ),
    properties: {
      title: 'Get in Touch',
    },
  },
  faq: {
    type: 'faq',
    name: 'FAQ',
    Component: ({ properties }: { properties: FAQProperties }) => (
      <div>
        <h2></h2>
        
      </div>
    ),
    properties: {
      title: 'Frequently Asked Questions',
    },

},
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
    pricingTable: {
      type: 'pricingTable',
      name: 'Pricing Table',
      Component: ({ properties }: { properties: PricingTableProperties }) => {
        const { backgroundColor, color, title, cards } = properties;
    
        return (
          <section style={{
            backgroundColor,
            color,
            padding: '20px',
            textAlign: 'center',
          }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>{title}</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
              {cards.map((card, index) => (
                <div key={index} style={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  padding: '15px',
                  flex: '1 1 30%', 
                  margin: '10px',
                  boxShadow: 'none',
                  textAlign: 'left',
                }}>
                  <h3 style={{ margin: '5px 0' }}>{card.title}</h3>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{card.price}</p>
                  <p style={{ marginBottom: '10px' }}>{card.description}</p>
                  <ul style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: '10px 0',
                  }}>
                    {card.features.map((feature, featureIndex) => (
                      <li key={featureIndex} style={{
                        margin: '5px 0',
                      }}>
                        • {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={card.buttonHref} style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    border: '1px solid #ddd', 
                    color: '#333',
                  }}>
                    {card.buttonText}
                  </a>
                </div>
              ))}
            </div>
          </section>
        );
      },
      properties: {
        backgroundColor: '#f9f9f9',
        color: '#333',
        title: 'Choose Your Plan',
        cards: [
          {
            title: 'Basic Plan',
            price: '$10/month',
            description: 'Ideal for individuals just starting out.',
            features: [
              '1 Website',
              '10 GB Storage',
              'Email Support',
            ],
            buttonText: 'Get Started',
            buttonHref: '#basic',
          },
          {
            title: 'Pro Plan',
            price: '$20/month',
            description: 'Perfect for small businesses looking to grow.',
            features: [
              '5 Websites',
              '50 GB Storage',
              'Priority Support',
            ],
            buttonText: 'Sign Up',
            buttonHref: '#pro',
          },
          {
            title: 'Enterprise Plan',
            price: '$30/month',
            description: 'Designed for large organizations needing robust solutions.',
            features: [
              'Unlimited Websites',
              '200 GB Storage',
              'Dedicated Support',
            ],
            buttonText: 'Contact Us',
            buttonHref: '#enterprise',
          },
        ],
      },
    },
    teamSection: {
      type: 'teamSection',
      name: 'Team Section',
      Component: ({ properties }: { properties: TeamSectionProperties }) => (
        <TeamSection properties={properties} />
      ),
      properties: {
        color: '#333',
        title: 'Meet Our Team',
        members: [
          {
            name: 'John Doe',
            position: 'CEO',
            photoUrl: 'https://example.com/photo1.jpg',
            description: 'John has over 10 years of experience in the industry.',
          },
          {
            name: 'Jane Smith',
            position: 'CTO',
            photoUrl: 'https://example.com/photo2.jpg',
            description: 'Jane leads our technical team with innovative solutions.',
          },
         
        ],
      },
    },
    
    
  
  };