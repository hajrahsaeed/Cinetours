import React from 'react';
import styles from './ClientLogos.module.css';
import { motion } from 'framer-motion';
import AT from '../../assets/ClientLogos/AT.png';
import figma from '../../assets/ClientLogos/figma.png';
import HH from '../../assets/ClientLogos/HH.png';
import IS from '../../assets/ClientLogos/IS.png';

/**
 * Enhanced Animated Client Logos Marquee
 * Single line that loops seamlessly with smooth transitions
 */
const ClientLogos = () => {
  const logos = [
    { src: AT , alt: 'AT', accentColor: '#10A37F' },
    { src: figma, alt: 'Figma', accentColor: '#A259FF' },
    { src: HH, alt: 'HS', accentColor: '#004B93' },
    { src: IS, alt: 'IS', accentColor: '#004B93' },
  ];

  // Double the array for seamless looping
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <motion.h2 
            className={styles.title}
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Join 1,000+ brands revolutionizing their workflow
          </motion.p>
        </motion.div>

        <div className={styles.marqueeContainer}>
          <motion.div 
            className={styles.marqueeWrapper}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className={styles.marquee}
              animate={{ 
                x: ['0%', '-100%'],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <motion.div 
                  key={`${logo.alt}-${index}`}
                  className={styles.logoContainer}
                  whileHover={{ 
                    scale: 1.15,
                    y: -5,
                    boxShadow: `0 10px 20px ${logo.accentColor}33`
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    className={styles.logoBackground}
                    style={{ backgroundColor: `${logo.accentColor}10` }}
                  />
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className={styles.logoImage}
                    loading="lazy"
                    style={{
                      filter: `drop-shadow(0 2px 4px ${logo.accentColor}40)`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;