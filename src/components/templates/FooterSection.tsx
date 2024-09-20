import React from 'react';

interface FooterProps {
  properties: React.CSSProperties;
}

const Footer = ({ properties }: FooterProps) => {
  return (
    <footer style={{ ...defaultStyles, ...properties }}>
      <p>© 2024 Your Website</p>
    </footer>
  );
};

const defaultStyles: React.CSSProperties = {
  backgroundColor: '#333',
  color: 'BLUE',
  textAlign: 'center',
  padding: '10px',
  fontSize: '14px',
  position: 'absolute',
  bottom: '0',
  width: '100%',
};

export default Footer;
