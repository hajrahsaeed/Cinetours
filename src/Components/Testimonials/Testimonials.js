import React from 'react';
import styles from './Testimonials.module.css';
import TestimonialCard from './TestimonialCard';
import { Container, Row, Col } from 'react-bootstrap';
import sarahImg from '../../assets/testimonials/sarah.jpg';
import michaelImg from '../../assets/testimonials/michael.jpg';
import emmaImg from '../../assets/testimonials/emma.jpg';
/**
 * Testimonials section with animated client feedback cards
 * @component
 */
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Real Estate Agent',
      message: 'AutoReel transformed my property listings. The videos increased my inquiries by 40% and helped me close deals faster than ever before.',
      image: sarahImg
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Property Developer',
      message: 'The quality of videos we received was exceptional. Our project sales improved significantly after using AutoReel for our marketing.',
      image: michaelImg
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Brokerage Owner',
      message: 'My entire team now uses AutoReel. The time saved on video creation allows us to focus more on client relationships and closing.',
      image: emmaImg
    }
  ];

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={12} className="text-center">
            <h3 className={styles.tagline}>What Our Clients Say</h3>
            <h2 className={styles.sectionTitle}>Real Stories, Real Results</h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.sectionDescription}>
              Don't just take our word for it - hear from professionals who've transformed their business
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col key={testimonial.id} lg={4} className={styles.testimonialCol}>
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