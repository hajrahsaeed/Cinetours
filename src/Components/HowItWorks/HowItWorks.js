import React, { useEffect } from 'react';
import styles from './HowItWorks.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true
    });
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
    <section className={styles.section}>
      {/* Gradient Overlay */}
      <div className={styles.gradientBg}></div>

      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={12} className="text-center">
            <h2 data-aos="fade-down" className={styles.sectionTitle}>
              How It Works
            </h2>
            <div data-aos="fade-right" className={styles.titleUnderline}></div>
          </Col>
        </Row>

        <Row className="g-4">
          {steps.map((step, index) => (
            <Col
              key={index}
              md={4}
              className={styles.stepCol}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Colorful Wave Effect */}
      <div className={styles.waveWrapper}>
        <svg
          className={styles.wave}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="url(#gradWave)"
            fillOpacity="5"
            d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,85.3C672,64,768,64,864,96C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128V320H0Z"
          ></path>
          <defs>
            <linearGradient id="gradWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#007BFF', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0077b6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default HowItWorks;
