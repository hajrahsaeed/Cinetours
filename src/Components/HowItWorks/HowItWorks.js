import React, { useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            titleRef.current.style.opacity = 1;
            titleRef.current.style.transform = 'translateY(0)';
            
            // Animate underline
            underlineRef.current.style.width = '80px';
            
            // Animate step cards (staggered)
            const stepCards = sectionRef.current.querySelectorAll(`.${styles.stepCard}`);
            stepCards.forEach((card, index) => {
              card.style.transitionDelay = `${index * 0.2}s`;
              card.style.opacity = 1;
              card.style.transform = 'translateY(0)';
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Upload your listing photos',
      description: 'Select and upload the photos for your property.'
    },
    {
      number: '2',
      title: 'AI editing creates your video',
      description: 'Our AI tools stitch together cinematic walkthroughs.'
    },
    {
      number: '3',
      title: 'Download & post in 24–48h',
      description: 'Receive your video and share it anywhere.'
    }
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={12} className="text-center">
            <h2 ref={titleRef} className={styles.sectionTitle}>How It Works</h2>
            <div ref={underlineRef} className={styles.titleUnderline}></div>
          </Col>
        </Row>

        <Row className="g-4">
          {steps.map((step, index) => (
            <Col key={index} md={4} className={styles.stepCol}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HowItWorks;