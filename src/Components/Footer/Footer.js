import React from 'react';
import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Modern footer component with social links and copyright
 * @component
 */
const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'bi bi-facebook',
      url: 'https://facebook.com'
    },
    {
      name: 'Instagram',
      icon: 'bi bi-instagram',
      url: 'https://instagram.com'
    },
    {
      name: 'Twitter',
      icon: 'bi bi-twitter-x',
      url: 'https://twitter.com'
    },
    {
      name: 'LinkedIn',
      icon: 'bi bi-linkedin',
      url: 'https://linkedin.com'
    }
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="align-items-center">
          {/* Logo and Description */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <div className={styles.brand}>
              <span className={styles.logo}>QuantumToursTours</span>
              <p className={styles.tagline}>Transforming real estate marketing</p>
            </div>
          </Col>

          {/* Social Links */}
          <Col md={4} className="text-center mb-3 mb-md-0">
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={styles.socialIcon}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </Col>

          {/* Copyright */}
          <Col md={3} className="text-center text-md-end">
            <p className={styles.copyright}>
              &copy; 2025 QuantumTours. All rights reserved.
            </p>
          </Col>
        </Row>

        {/* Additional Links */}
        <Row className="mt-4">
          <Col xs={12} className="text-center">
            <div className={styles.additionalLinks}>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/contact">Contact Us</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;