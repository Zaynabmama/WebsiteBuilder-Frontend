import React from 'react';
import styles from '../styles/Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; 
}

const Button = ({ type = 'button', onClick, children, className }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${className || ''}`}>
      {children}
    </button>
  );
};

export default Button;
