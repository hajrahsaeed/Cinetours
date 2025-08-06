// src/components/Button/Button.js
import React from 'react';
import styles from './Button.module.css';

/**
 * Reusable Button component
 * @param {Object} props - Component props
 * @param {string} props.variant - 'primary' or 'secondary'
 * @param {string} props.children - Button text
 * @param {function} props.onClick - Click handler
 */
const Button = ({ variant = 'primary', children, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;