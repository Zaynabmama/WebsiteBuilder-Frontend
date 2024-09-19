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
  
  export interface Testimonial {
    name: string;
    feedback: string;
  }
  
  export interface TestimonialSectionProperties {
    backgroundColor: string;
    color: string;
    testimonials: Testimonial[];
  }
  
  export interface TeamMember {
    name: string;
    role: string;
    bio: string;
  }
  
  export interface TeamSectionProperties {
    backgroundColor: string;
    color: string;
    team: TeamMember[];
  }
  
  export interface ContactFormProperties {
    backgroundColor: string;
    color: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderMessage: string;
    submitButtonText: string;
  }
  
  export interface FooterProperties {
    backgroundColor: string;
    color: string;
    links: NavLink[];
  }
  
  export interface ImageGalleryProperties {
    images: string[];
  }
  
  export interface BlogPost {
    href: string | undefined;
    title: string;
    excerpt: string;
    date: string;
  }
  
  export interface BlogSectionProperties {
    backgroundColor: string;
    color: string;
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
    | 'sidebar'
    | 'heroSection'
    | 'card'
    | 'pricingCards'
    | 'testimonialSection'
    | 'teamSection'
    | 'contactForm'
    | 'footer'

    | 'blogSection';
  
  export interface AdvancedPredefinedComponent<T> {
    type: AdvancedPredefinedComponentType;
    name: string;
    Component: ({ properties }: { properties: T }) => JSX.Element;
    properties: T;
  }
  
  // Components
  
  export const advancedPredefinedComponents: Record<AdvancedPredefinedComponentType, AdvancedPredefinedComponent<any>> = {
    footer: {
        type: 'footer',
        name: 'Footer',
        Component: ({ properties }: { properties: FooterProperties }) => {
          const { backgroundColor, color, links } = properties;
      
          return (
            <footer style={{
              backgroundColor,
              color,
              padding: '20px 0',
              textAlign: 'center',
            }}>
              <nav>
                <ul style={{
                  display: 'flex',
                  justifyContent: 'center',
                  listStyleType: 'none',
                  padding: '0',
                }}>
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
          Component: ({ properties }: { properties: NavbarProperties; }) => {
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
          Component: ({ properties }: { properties: SidebarProperties; }) => {
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
          Component: ({ properties }: { properties: HeroSectionProperties; }) => {
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
          Component: ({ properties }: { properties: CardProperties; }) => {
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
          const { backgroundColor, color, title, cards } = properties;
    
          return (
            <section style={{
              backgroundColor,
              color,
              padding: '50px 20px',
              textAlign: 'center',
            }}>
              <h2>{title}</h2>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px',
              }}>
                {cards.map((card, index) => (
                  <div key={index} style={{
                    backgroundColor: '#fff',
                    color: '#333',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '250px',
                    textAlign: 'left',
                  }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{card.title}</h3>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#0070f3' }}>{card.price}</h4>
                    <ul style={{ padding: '0', listStyleType: 'none', marginBottom: '20px' }}>
                      {card.features.map((feature, idx) => (
                        <li key={idx} style={{ marginBottom: '10px' }}>✔ {feature}</li>
                      ))}
                    </ul>
                    <a href={card.signUpHref} style={{
                      backgroundColor: card.buttonColor,
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      textAlign: 'center',
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
              features: ['Feature 1', 'Feature 2', 'Feature 3'],
              buttonText: 'Sign Up',
              signUpHref: '#basic',
              buttonColor: '#28a745',
            },
            {
              title: 'Pro Plan',
              price: '$30/month',
              features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
              buttonText: 'Get Started',
              signUpHref: '#pro',
              buttonColor: '#ffc107',
            },
            {
              title: 'Enterprise Plan',
              price: '$50/month',
              features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
              buttonText: 'Contact Us',
              signUpHref: '#enterprise',
              buttonColor: '#dc3545',
            },
          ],
        },
      },
      testimonialSection: {
        type: 'testimonialSection',
        name: 'Testimonial Section',
        Component: ({ properties }: { properties: TestimonialSectionProperties }) => {
          const { backgroundColor, color, testimonials } = properties;
    
          return (
            <section style={{
              backgroundColor,
              color,
              padding: '50px 20px',
              textAlign: 'center',
            }}>
              <h2>What Our Clients Say</h2>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px',
              }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} style={{
                    backgroundColor: '#fff',
                    color: '#333',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '300px',
                    textAlign: 'left',
                  }}>
                    <p style={{ fontStyle: 'italic' }}>"{testimonial.feedback}"</p>
                    <h4 style={{ marginTop: '20px', fontWeight: 'bold' }}>{testimonial.name}</h4>
                  </div>
                ))}
              </div>
            </section>
          );
        },
        properties: {
          backgroundColor: '#f9f9f9',
          color: '#333',
          testimonials: [
            { name: 'John Doe', feedback: 'The service was outstanding! I am extremely satisfied.' },
            { name: 'Jane Smith', feedback: 'Absolutely fantastic experience. Highly recommended!' },
            { name: 'James Brown', feedback: 'Exceeded all my expectations. Superb service.' },
          ],
        },
      },
      blogSection: {
        type: 'blogSection',
        name: 'Blog Section',
        Component: ({ properties }: { properties: BlogSectionProperties }) => {
          const { posts } = properties;
      
          return (
            <section style={{ padding: '50px 20px' }}>
              <h2>Latest Blog Posts</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
              }}>
                {posts.map((post, index) => (
                  <div key={index} style={{
                    border: '1px solid #ddd',
                    padding: '20px',
                    borderRadius: '10px',
                  }}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <a href={post.href} style={{ color: '#0070f3' }}>Read more</a>
                  </div>
                ))}
              </div>
            </section>
          );
        },
        properties: {
          posts: [
            { title: 'Post 1', excerpt: 'This is a brief summary of post 1.', href: '#post1' },
            { title: 'Post 2', excerpt: 'This is a brief summary of post 2.', href: '#post2' },
            { title: 'Post 3', excerpt: 'This is a brief summary of post 3.', href: '#post3' },
          ],
        },
      },
      
      teamSection: {
        type: 'teamSection',
        name: 'Team Section',
        Component: ({ properties }: { properties: TeamSectionProperties }) => {
          const { backgroundColor, color, team } = properties;
    
          return (
            <section style={{
              backgroundColor,
              color,
              padding: '50px 20px',
              textAlign: 'center',
            }}>
              <h2>Meet Our Team</h2>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px',
              }}>
                {team.map((member, index) => (
                  <div key={index} style={{
                    backgroundColor: '#fff',
                    color: '#333',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '250px',
                    textAlign: 'left',
                  }}>
                    <h3 style={{ marginBottom: '10px' }}>{member.name}</h3>
                    <h4 style={{ marginBottom: '20px', color: '#0070f3' }}>{member.role}</h4>
                    <p>{member.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        },
        properties: {
          backgroundColor: '#f0f0f0',
          color: '#333',
          team: [
            { name: 'Alice Johnson', role: 'CEO', bio: 'Alice is the visionary behind our company.' },
            { name: 'Bob Williams', role: 'CTO', bio: 'Bob leads our tech innovations.' },
            { name: 'Charlie Davis', role: 'CFO', bio: 'Charlie oversees financial operations.' },
          ],
        },
      },
      contactForm: {
        type: 'contactForm',
        name: 'Contact Form',
        Component: ({ properties }: { properties: ContactFormProperties }) => {
          const {
            backgroundColor, color, placeholderName, placeholderEmail, placeholderMessage, submitButtonText,
          } = properties;
    
          return (
            <section style={{
              backgroundColor,
              color,
              padding: '50px 20px',
              textAlign: 'center',
            }}>
              <h2>Contact Us</h2>
              <form style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                marginTop: '30px',
              }}>
                <input type="text" placeholder={placeholderName} style={{
                  padding: '10px',
                  width: '300px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }} />
                <input type="email" placeholder={placeholderEmail} style={{
                  padding: '10px',
                  width: '300px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }} />
                <textarea placeholder={placeholderMessage} rows={5} style={{
                  padding: '10px',
                  width: '300px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}></textarea>
                <button type="submit" style={{
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}>
                  {submitButtonText}
                </button>
              </form>
            </section>
          );
        },
        properties: {
          backgroundColor: '#f9f9f9',
          color: '#333',
          placeholderName: 'Your Name',
          placeholderEmail: 'Your Email',
          placeholderMessage: 'Your Message',
          submitButtonText: 'Send Message',
        },
      },
                

  };
  