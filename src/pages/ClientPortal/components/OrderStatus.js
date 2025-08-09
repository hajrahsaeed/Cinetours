import React from 'react';
import { Card, ProgressBar, Spinner } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

/**
 * Visualizes order progress through stages
 * @component
 * @param {Array} orders - Array of order objects
 * @param {boolean} loading - Data loading state
 * 
 * Backend Integration:
 * - Expects orders array with:
 *   - id: string
 *   - status: 'submitted'|'processing'|'delivered'
 *   - date: string (ISO format)
 *   - package: string
 *   - photos: number
 */
const OrderStatus = ({ orders, loading }) => {
  const statusSteps = [
    { id: 1, name: 'Submitted', variant: 'info' },
    { id: 2, name: 'Processing', variant: 'warning' },
    { id: 3, name: 'Delivered', variant: 'success' }
  ];

  return (
    <Card className={styles.portalCard}>
      <Card.Header as="h4">Your Orders</Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <h5>Order #{order.id}</h5>
                <span className="text-muted">{order.date}</span>
              </div>
              
              <ProgressBar className="mb-2">
                {statusSteps.map(step => (
                  <ProgressBar
                    key={step.id}
                    variant={step.variant}
                    now={order.status === step.name.toLowerCase() ? 100 : 0}
                    label={step.name}
                  />
                ))}
              </ProgressBar>
              
              <div className="d-flex justify-content-between">
                <span>{order.package} Package</span>
                <span>{order.photos} photos</span>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderStatus;