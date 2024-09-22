import React from 'react';
import styles from '../styles/Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; 
  disabled?: boolean;
}

const Button = ({ type = 'button', onClick, children, className,disabled }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}
    className={`${styles.button} ${className || ''}`}
    disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
