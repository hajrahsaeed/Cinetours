import React, { useLayoutEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cloudImage from '../../assets/images/clouds.png';
import houseImage from '../../assets/images/house.png';

// GSAP plugins are now registered in App.js

const Hero = ({ title, subtitle }) => {
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.18)" },
    tap: { scale: 0.98 }
  };

  // Refs for GSAP animation
  const heroRef = useRef(null);
  const cloudsRef = useRef(null);
  const houseRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (!hero) return;

      const clouds = cloudsRef.current;
      const house = houseRef.current;
      const text = textRef.current;
      
      // Check if elements exist before animating
      if (!clouds || !house || !text) return;
      
      // scope the button nodes to the hero to avoid global selection collision
      const buttons = gsap.utils.toArray('.hero-button', hero);

      // --- 1) set clean initial (off-screen) states ---
      gsap.set(clouds, { y: -200, opacity: 0 });
      gsap.set(house, { x: 300, opacity: 0 });
      gsap.set(text, { x: -100, opacity: 0 });
      gsap.set(buttons, { x: -80, opacity: 0 });

      // --- 2) entry timeline (plays once on mount) ---
      const entryTl = gsap.timeline();
      entryTl
        .to(clouds, { y: 0, opacity: 0.8, duration: 1.4, ease: "power2.out" }, 0)
        .to(house, { x: 0, opacity: 1, duration: 1.2, delay: 0.15, ease: "back.out(1.7)" }, 0)
        .to(text, { x: 0, opacity: 1, duration: 1.0, delay: 0.35, ease: "power2.out" }, 0.15)
        .to(buttons, { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }, 0.5);

      // --- 3) scroll timeline: visible -> off-screen controlled by scroll ---
      // scrub: 0.3 gives a smooth follow; change to `true` to strictly tie to scroll position.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top", // when hero top hits viewport top
          end: () => "+=" + Math.max(hero.offsetHeight, window.innerHeight * 0.6), // scroll range dynamic
          scrub: 0.3, // smoothing; use `true` for direct tie to scroll
          // markers: true, // enable for debugging
        }
      });

      // animate back to off-screen values as scrollProgress increases
      scrollTl
        .to(clouds, { y: -200, opacity: 0, ease: "none" }, 0)
        .to(house, { x: 300, opacity: 0, ease: "none" }, 0)
        .to(text, { x: -100, opacity: 0, ease: "none" }, 0)
        .to(buttons, { x: -80, opacity: 0, stagger: 0.12, ease: "none" }, 0);

      // Note: entryTl and scrollTl target the same elements but do different jobs:
      // entryTl animates in once, scrollTl is scrubbed by scroll to animate out & back in smoothly.
    }, heroRef);

    return () => ctx.revert(); // cleans timelines & ScrollTriggers
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.skyBackground}></div>

      <div ref={cloudsRef} className={styles.cloudsContainer}>
        <img src={cloudImage} alt="Clouds" className={styles.clouds} />
      </div>

      <div className={styles.content}>
        <div ref={textRef} className={styles.textContent}>
          <h1>{title}</h1>
          <p>{subtitle}</p>

          <div ref={buttonsRef} className={styles.buttonGroup}>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`${styles.primaryButton} hero-button`}
            >
              <Link to="/portal">Order Now</Link>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`${styles.secondaryButton} hero-button`}
            >
              <Link to="/pricing">View Pricing</Link>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`${styles.tertiaryButton} hero-button`}
            >
              <Link to="/portal">Upload Photos</Link>
            </motion.button>
          </div>
        </div>

        <div className={styles.houseContainer}>
          <img ref={houseRef} src={houseImage} alt="House" className={styles.house} />
        </div>
      </div>
    </section>
  );
};

export default Hero;