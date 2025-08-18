import React from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/videos/hero-background.mp4'; // Adjust the path as necessary

const Hero = ({ title, subtitle }) => {
  // Button animation variants
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.3)" },
    tap: { scale: 0.98 }
  };

  return (
    <section className={styles.hero}>
      {/* Video Background (existing code) */}
      <div className={styles.videoContainer}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      {/* Content with Buttons */}
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        
        <div className={styles.buttonGroup}>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={styles.primaryButton}
          >
            <Link to="/portal">Order Now</Link>
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={styles.secondaryButton}
          >
            <Link to="/pricing">View Pricing</Link>
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={styles.tertiaryButton}
          >
            <Link to="/portal">Upload Photos</Link>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;