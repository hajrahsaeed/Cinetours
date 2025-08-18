import React, { useState, useEffect, useRef } from 'react';
import styles from './VideoComparison.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const VideoComparison = ({ 
  title, 
  description, 
  comparisons, 
  slideInterval = 5000,
  showLabels = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Reset video when source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); 
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [activeIndex, comparisons]);

  // Auto-advance to next comparison
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && comparisons?.length) {
        goToNext();
      }
    }, slideInterval);

    return () => clearInterval(interval);
  }, [isPlaying, comparisons?.length, slideInterval, activeIndex]);

  const goToPrev = () => {
    setActiveIndex(prev => (prev === 0 ? comparisons.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const goToNext = () => {
    setActiveIndex(prev => (prev + 1) % comparisons.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), slideInterval * 2);
  };

  return (
    <Container fluid className={`${styles.sectionWrapper} py-3 py-md-5`} ref={containerRef}>
      {/* Header Section */}
      <Row className="mb-3 mb-md-5 mx-0">
        <Col xs={12} className="px-0">
          <div className={`${styles.headerDesign} text-center`}>
            <h2 className={`${styles.title} mb-2 mb-md-3`}>{title}</h2>
            {description && (
              <p className={`${styles.description} mb-0`}>{description}</p>
            )}
          </div>
        </Col>
      </Row>

      {/* Media Comparison Section */}
      <Row className="justify-content-center mx-0">
        <Col xs={12} className="px-0">
          <div className={styles.comparisonContainer}>
            <div className={styles.comparisonFrame}>
              <div className={styles.mediaWrapper}>
                <button 
                  className={`${styles.navArrow} ${styles.arrowLeft}`}
                  onClick={goToPrev}
                  aria-label="Previous comparison"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <div className={styles.mediaGrid}>
                  <div className={styles.mediaFrame}>
                    <img
                      src={comparisons[activeIndex]?.photo}
                      alt="Original property"
                      className={styles.mediaContent}
                      loading="lazy"
                      key={`photo-${activeIndex}`}
                    />
                  </div>

                  <div className={styles.mediaFrame}>
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={styles.mediaContent}
                      key={`video-${activeIndex}`}
                    >
                      <source src={comparisons[activeIndex]?.video} type="video/mp4" />
                    </video>
                  </div>
                </div>

                <button 
                  className={`${styles.navArrow} ${styles.arrowRight}`}
                  onClick={goToNext}
                  aria-label="Next comparison"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

              {showLabels && (
                <div className={styles.labelRow}>
                  <span className={styles.mediaLabel}>Original Photo</span>
                  <span className={styles.mediaLabel}>Cinematic Result</span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Indicators Row */}
      <Row className="justify-content-center mx-0 mt-3 mt-md-4">
        <Col xs="auto" className="px-0">
          <div className={styles.indicators}>
            {comparisons?.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === activeIndex ? styles.active : ''
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  resetAutoPlay();
                }}
                aria-label={`Show comparison ${index + 1}`}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoComparison;