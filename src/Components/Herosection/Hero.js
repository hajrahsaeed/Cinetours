// src/components/Hero/Hero.js
import React from 'react';
import styles from './Hero.module.css';
import heroVideo from '../../assets/videos/hero-background.mp4';

const Hero = ({ title, subtitle }) => {
  return (
    <section className={styles.hero}>
      {/* Video Container with Opacity Layer */}
      <div className={styles.videoContainer}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}></div>
      </div>
      
      {/* Content (will appear above the video) */}
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
};

export default Hero;