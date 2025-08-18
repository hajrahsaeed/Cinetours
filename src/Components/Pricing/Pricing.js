import React from 'react';
import styles from './Pricing.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import useAdminData from '../../pages/AdminPortal/hooks/useAdminData';

const Pricing = () => {
  const { getPublicPricing } = useAdminData();
  const pricingPlans = getPublicPricing();

  return (
    <section className={styles.pricingSection}>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={12} className="text-center">
            <h2 className={styles.sectionTitle}>Pricing</h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.sectionSubtitle}>Choose the perfect plan for your needs</p>
          </Col>
        </Row>

        {/* Desktop Table */}
        <div className={styles.pricingTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Package</div>
            <div className={styles.headerCell}>Photo Count</div>
            <div className={styles.headerCell}>Turnaround</div>
            <div className={styles.headerCell}>Price</div>
          </div>

          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`${styles.tableRow} ${plan.popular ? styles.popularRow : ''}`}
            >
              <div className={styles.tableCell}>
                {plan.package}
                {plan.popular && <span className={styles.popularBadge}>Most Popular</span>}
              </div>
              <div className={styles.tableCell}>{plan.photocount}</div>
              <div className={styles.tableCell}>{plan.turnaround}</div>
              <div className={`${styles.tableCell} ${styles.priceCell}`}>
                {plan.price}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className={styles.mobileCards}>
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`${styles.mobileCard} ${plan.popular ? styles.popularCard : ''}`}
            >
              {plan.popular && (
                <div className={styles.mobilePopularBadge}>Most Popular</div>
              )}
              <h3 className={styles.mobilePackage}>{plan.package}</h3>
              <div className={styles.mobileDetail}>
                <span>Photos:</span> {plan.photocount}
              </div>
              <div className={styles.mobileDetail}>
                <span>Turnaround:</span> {plan.turnaround}
              </div>
              <div className={styles.mobilePrice}>{plan.price}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Pricing;