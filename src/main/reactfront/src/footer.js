import React from 'react';
import styles from './css/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <p className={styles['footer-text']}>© 2024 My Simple React App</p>
    </footer>
  );
}

export default Footer;