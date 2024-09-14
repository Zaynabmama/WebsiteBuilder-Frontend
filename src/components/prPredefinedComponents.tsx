// interface Component {
//     type: string;
//     label: string;
//     defaultProperties: Record<string, any>;
//   }
  
//   export const availableComponents: Component[] = [
//     {
//       type: 'button',
//       label: 'Button',
//       defaultProperties: {
//         text: 'Click Me',
//         backgroundColor: 'blue',
//         color: 'red',
//         fontSize: '16px',
//       },
//     },
//     {
//         type: 'header',
//         label: 'Header',
//         defaultProperties: {
//           text: 'Header Text',
//           fontSize: '24px',
//           color: '#333',
//         },
//       },
//       {
//         type: 'text',
//         label: 'Text Block',
//         defaultProperties: {
//           text: 'Enter your text here',
//           fontSize: '16px',
//           color: '#000',
//         },
//       },
//       {
//         type: 'img',
//         label: 'Image',
//         defaultProperties: {
//           src: 'https://via.placeholder.com/150',
//           alt: 'Placeholder Image',
//           width: '150px',
//           height: '150px',
//         },
//       },
//       {
//         type: 'container',
//         label: 'Container',
//         defaultProperties: {
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: '100%',
//           padding: '20px',
//         },
//       },
   
//   ];
import  {ComponentItem} from '../type';


// src/components/PredefinedComponents.tsx
// src/components/prPredefinedComponents.tsx
import React from 'react';
import { ComponentProps } from '../type';

const Header: React.FC<ComponentProps> = ({ properties = {} }) => {
  const { text = 'Header', fontSize = '24px', color = '#333', textAlign = 'center', margin = '10px 0' } = properties;
  return <header style={{ fontSize, color, textAlign, margin }}>{text}</header>;
};

const HeroSection: React.FC<ComponentProps> = ({ properties = {} }) => {
  const { text = 'Hero Section', fontSize = '32px', color = '#000', backgroundImage, height } = properties;
  return (
    <section
      style={{
        fontSize,
        color,
        backgroundImage: `url(${backgroundImage})`,
        height,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {text}
    </section>
  );
};

const Card: React.FC<ComponentProps> = ({ properties = {} }) => {
  const { title = 'Card Title', description = 'Card description goes here.', padding = '20px', border = '1px solid #ddd', width = '300px' } = properties;
  return (
    <div style={{ padding, border, width }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Image: React.FC<ComponentProps> = ({ properties = {} }) => {
  const { src = 'https://via.placeholder.com/150', alt = 'Image', width = '150px', height = '150px' } = properties;
  return <img src={src} alt={alt} style={{ width, height }} />;
};

const Button: React.FC<ComponentProps> = ({ properties = {} }) => {
  const { text = 'Button', backgroundColor = '#007BFF', color = '#fff', padding = '10px' } = properties;
  return <button style={{ backgroundColor, color, padding }}>{text}</button>;
};

export const predefinedComponents: Record<string, React.FC<ComponentProps>> = {
  header: Header,
  hero: HeroSection,
  card: Card,
  image: Image,
  button: Button,
};
