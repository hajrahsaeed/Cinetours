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

  // Reset video when source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload video when source changes
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
    <Container fluid className={`${styles.sectionWrapper} py-5`}>
      {/* Header Section */}
      <Row className="justify-content-center mb-5">
        <Col lg={8} className="text-center">
          <div className={styles.headerDesign}>
            <h2 className={`${styles.title} mb-3`}>{title}</h2>
            {description && (
              <p className={`${styles.description} lead`}>{description}</p>
            )}
          </div>
        </Col>
      </Row>

      {/* Media Comparison Section */}
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          <div className={styles.comparisonFrame}>
            <div className="d-flex align-items-center">
              <button 
                className={`${styles.navArrow} ${styles.arrowLeft}`}
                onClick={goToPrev}
                aria-label="Previous comparison"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              <div className={styles.mediaGrid}>
                {/* Photo Frame */}
                <div className={styles.mediaFrame}>
                  <img
                    src={comparisons[activeIndex]?.photo}
                    alt="Original property"
                    className={styles.mediaContent}
                    loading="lazy"
                    key={`photo-${activeIndex}`} // Force re-render
                  />
                </div>

                {/* Video Frame */}
                <div className={styles.mediaFrame}>
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.mediaContent}
                    key={`video-${activeIndex}`} // Force re-render
                  >
                    <source 
                      src={comparisons[activeIndex]?.video} 
                      type="video/mp4" 
                    />
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
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs="auto">
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