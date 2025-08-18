import React from 'react';
import styles from './Testimonials.module.css';
import TestimonialCard from './TestimonialCard';
import { Container, Row, Col } from 'react-bootstrap';
import sarahImg from '../../assets/testimonials/sarah.jpg';
import michaelImg from '../../assets/testimonials/michael.jpg';
import emmaImg from '../../assets/testimonials/emma.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'TOP PRODUCER | RE/MAX',
      message: 'AutoReel transformed my business. My listings get 3x more views and my open house attendance doubled. The quality rivals professional videographers at a fraction of the cost.',
      image: sarahImg,
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'DEVELOPER | LUXE PROPERTIES',
      message: 'We use AutoReel for all our luxury developments. The cinematic quality helps us command premium prices - our last project sold out 3 weeks faster than projected.',
      image: michaelImg,
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'BROKER OWNER | ELITE REALTY',
      message: 'Game-changing technology. My agents save 10+ hours per listing while delivering superior marketing. Our brand recognition has never been stronger.',
      image: emmaImg,
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className={`${styles.backgroundAccent} ${styles.accent1}`}></div>
      <div className={`${styles.backgroundAccent} ${styles.accent2}`}></div>
            <div className={styles.gradientOverlay}></div>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className={styles.sectionHeaderContainer}>
            <span className={styles.tagline}>Recommendation by Clients</span>
            <h2 className={styles.sectionTitle}>Real CLients, Real Stories</h2>
            <div className={styles.titleUnderline}></div>
          </Col>
        </Row>

        <Row className="g-4 mt-4">
          {testimonials.map((testimonial, index) => (
            <Col key={testimonial.id} lg={4} className="d-flex">
              <TestimonialCard 
                testimonial={testimonial} 
                index={index} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;