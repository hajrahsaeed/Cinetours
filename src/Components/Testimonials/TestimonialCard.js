import React, { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

/**
 * Animated testimonial card component
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.testimonial - Testimonial data
 * @param {number} props.index - Card index for animation delay
 */
const TestimonialCard = ({ testimonial, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`${styles.testimonialCard} ${index % 2 === 0 ? styles.fromLeft : styles.fromRight}`}
      style={{ '--delay': `${index * 0.2}s` }}
    >
      <div className={styles.cardContent}>
        <div className={styles.clientInfo}>
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className={styles.clientImage}
          />
          <div>
            <h4 className={styles.clientName}>{testimonial.name}</h4>
            <p className={styles.clientRole}>{testimonial.role}</p>
          </div>
        </div>
        <div className={styles.divider}></div>
        <p className={styles.testimonialText}>"{testimonial.message}"</p>
      </div>
    </div>
  );
};

export default TestimonialCard;