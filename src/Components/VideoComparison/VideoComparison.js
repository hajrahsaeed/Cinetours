import React, { useState, useEffect } from 'react';
import styles from './VideoComparison.module.css';

/**
 * Enhanced video comparison component with auto-slide and manual navigation
 * @param {Object} props - Component props
 * @param {string} props.title - Section heading
 * @param {string} props.description - Section description
 * @param {Array} props.videos - Array of video pairs [{before: 'path', after: 'path'}]
 * @param {number} [props.slideInterval=5000] - Auto-slide interval in ms
 */
const VideoComparison = ({ 
  title, 
  description, 
  videos, 
  slideInterval = 5000 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && videos?.length) {
        goToNext();
      }
    }, slideInterval);

    return () => clearInterval(interval);
  }, [isPlaying, videos?.length, slideInterval, activeIndex]);

  const goToPrev = () => {
    setActiveIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const goToNext = () => {
    setActiveIndex(prev => (prev + 1) % videos.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), slideInterval * 2);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.videoContainer}>
        <button 
          className={styles.navArrowLeft} 
          onClick={goToPrev}
          aria-label="Previous comparison"
        >
          &lt;
        </button>

        <div className={styles.videoGrid}>
          <div className={styles.videoWrapper}>
            <h3 className={styles.videoLabel}>Before</h3>
            <video
              autoPlay
              loop
              muted
              playsInline
              className={styles.video}
            >
              <source src={videos[activeIndex]?.before} type="video/mp4" />
            </video>
          </div>

          <div className={styles.videoWrapper}>
            <h3 className={styles.videoLabel}>After</h3>
            <video
              autoPlay
              loop
              muted
              playsInline
              className={styles.video}
            >
              <source src={videos[activeIndex]?.after} type="video/mp4" />
            </video>
          </div>
        </div>

        <button 
          className={styles.navArrowRight} 
          onClick={goToNext}
          aria-label="Next comparison"
        >
          &gt;
        </button>
      </div>

      <div className={styles.indicators}>
        {videos?.map((_, index) => (
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
    </section>
  );
};

export default VideoComparison;