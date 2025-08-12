import React from 'react';
import styles from './CostComparison.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiDollarSign, FiFilm, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { FaVideo } from 'react-icons/fa';

const CostComparison = () => {
  const comparisonData = [
    {
      category: "Time",
      icon: <FiClock className={styles.icon}/>,
      items: [
        { 
          feature: "Turnaround", 
          ai: "24-48 hours", 
          traditional: "2-3 weeks",
          advantage: "83% faster",
          tooltip: "List properties while competitors are still scheduling shoots"
        },
        { 
          feature: "Scheduling", 
          ai: "Instant upload", 
          traditional: "1-2 week wait",
          advantage: "No delays",
          tooltip: "No coordinating with photographers' availability"
        }
      ]
    },
    {
      category: "Cost",
      icon: <FiDollarSign className={styles.icon}/>,
      items: [
        { 
          feature: "Production", 
          ai: "$49-$149", 
          traditional: "$1,500-$5,000",
          advantage: "90% cheaper",
          tooltip: "Typical savings per property"
        },
        { 
          feature: "Recurring", 
          ai: "None", 
          traditional: "$200+/month",
          advantage: "No equipment costs",
          tooltip: "Traditional requires camera gear/software subscriptions"
        }
      ]
    },
    {
      category: "Quality",
      icon: <FiFilm className={styles.icon}/>,
      items: [
        { 
          feature: "Resolution", 
          ai: "4K HDR", 
          traditional: "4K",
          advantage: "Equal quality",
          tooltip: "Both deliver professional-grade output"
        },
        { 
          feature: "Revisions", 
          ai: "Unlimited", 
          traditional: "$150/revision",
          advantage: "More flexibility",
          tooltip: "Make changes without budget anxiety"
        }
      ]
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title Section */}
        <motion.div 
          className={styles.titleContainer}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className={styles.titleWrapper}>
            
            <h2 className={styles.mainTitle}>
              Comparison with Traditional Video Shooting
            </h2>
          </div>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            See how AI video generation saves time and money while delivering professional results
          </motion.p>
        </motion.div>

        {/* Mobile Cards */}
        <div className={styles.mobileCards}>
          {comparisonData.map((category, catIndex) => (
            <React.Fragment key={catIndex}>
              <motion.h3 
                className={styles.mobileCategory}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                {category.icon} {category.category}
              </motion.h3>
              
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className={styles.mobileCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.2 + itemIndex * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.mobileFeature}>
                    <span>{item.feature}</span>
                    <div className={styles.mobileTooltip}>i</div>
                    <div className={styles.mobileTooltipText}>{item.tooltip}</div>
                  </div>
                  <div className={styles.mobileComparison}>
                    <div className={styles.mobileColumn}>
                      <span className={styles.mobileLabel}>AI Service</span>
                      <span className={styles.mobileValueAI}>{item.ai}</span>
                    </div>
                    <div className={styles.mobileColumn}>
                      <span className={styles.mobileLabel}>Traditional</span>
                      <span className={styles.mobileValueTraditional}>{item.traditional}</span>
                    </div>
                    <div className={styles.mobileColumn}>
                      <span className={styles.mobileLabel}>Advantage</span>
                      <span className={styles.mobileAdvantage}>{item.advantage}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop Table */}
        <div className={styles.desktopTable}>
          <motion.table 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={styles.comparisonTable}
          >
            <thead>
              <motion.tr 
                className={styles.tableHeader}
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <th className={styles.categoryHeader}>Category</th>
                <th className={styles.featureHeader}>Feature</th>
                <th className={styles.aiHeader}>
                  <motion.span 
                    className={styles.badge}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiCheckCircle/> AI Service
                  </motion.span>
                </th>
                <th className={styles.traditionalHeader}>
                  <motion.span 
                    className={styles.badge}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiXCircle/> Traditional
                  </motion.span>
                </th>
                <th className={styles.advantageHeader}>Your Advantage</th>
              </motion.tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {comparisonData.map((category, catIndex) => (
                  <React.Fragment key={catIndex}>
                    {category.items.map((item, itemIndex) => (
                      <motion.tr
                        key={`${catIndex}-${itemIndex}`}
                        className={styles.tableRow}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: catIndex * 0.2 + itemIndex * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 5px 15px rgba(33, 171, 181, 0.2)"
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                      >
                        {itemIndex === 0 && (
                          <motion.td 
                            rowSpan={category.items.length}
                            className={styles.categoryCell}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: catIndex * 0.2 }}
                          >
                            <div className={styles.categoryWrapper}>
                              {category.icon}
                              {category.category}
                            </div>
                          </motion.td>
                        )}
                        
                        <td className={styles.featureCell}>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className={styles.featureWrapper}
                            data-tooltip={item.tooltip}
                          >
                            {item.feature}
                          </motion.div>
                        </td>
                        
                        <td className={styles.aiCell}>
                          <motion.div 
                            className={styles.value}
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.ai}
                          </motion.div>
                        </td>
                        
                        <td className={styles.traditionalCell}>
                          <motion.div 
                            className={styles.value}
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.traditional}
                          </motion.div>
                        </td>
                        
                        <td className={styles.advantageCell}>
                          <motion.span
                            className={styles.advantagePill}
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "#21ABB5",
                              color: "white"
                            }}
                            transition={{ type: "spring" }}
                          >
                            {item.advantage}
                          </motion.span>
                        </td>
                      </motion.tr>
                    ))}
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>

        {/* Footer */}
        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className={styles.conclusionCard}
            whileHover={{ 
              rotate: -1,
              boxShadow: "0 10px 25px rgba(33, 171, 181, 0.3)"
            }}
          >
            <h3>Total Estimated Savings</h3>
            <motion.p
              animate={{
                scale: [1, 1.05, 1],
                color: ["#21ABB5", "#e63946", "#21ABB5"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className={styles.savingsAmount}
            >
              $3,000+ per property
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostComparison;