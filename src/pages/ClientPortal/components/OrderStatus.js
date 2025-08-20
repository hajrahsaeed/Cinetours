import React from 'react';
import { Card, ProgressBar, Spinner } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

const OrderStatus = ({ orders, loading }) => {
  const statusSteps = [
    { id: 1, name: 'Submitted', variant: 'info' },
    { id: 2, name: 'Processing', variant: 'warning' },
    { id: 3, name: 'Delivered', variant: 'success' }
  ];

  return (
    <Card className={`${styles.portalCard} ${styles.orderCard}`}>
      <Card.Header as="h4" className={styles.orderHeader}>
        Your Orders
      </Card.Header>
      <Card.Body className={styles.orderBody}>
        {loading ? (
          <div className={`text-center ${styles.loadingContainer}`}>
            <Spinner animation="border" className={styles.loadingSpinner} />
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className={`mb-4 ${styles.orderItem}`}>
              <div className={`d-flex justify-content-between mb-2 ${styles.orderTop}`}>
                <h5 className={styles.orderId}>Order #{order.id}</h5>
                <span className={styles.orderDate}>{order.date}</span>
              </div>

              <ProgressBar className={`mb-2 ${styles.orderProgress}`}>
                {statusSteps.map(step => (
                  <ProgressBar
                    key={step.id}
                    variant={step.variant}
                    now={order.status === step.name.toLowerCase() ? 100 : 0}
                    label={step.name}
                    className={styles.progressStep}
                  />
                ))}
              </ProgressBar>

              <div className={`d-flex justify-content-between ${styles.orderDetails}`}>
                <span className={styles.orderPackage}>{order.package} Package</span>
                <span className={styles.orderPhotos}>{order.photos} photos</span>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderStatus;
