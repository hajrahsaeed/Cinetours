import React from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

/**
 * Displays past orders for reordering
 * @component
 * @param {Array} pastOrders - Completed orders
 * 
 * Backend Integration:
 * - Expects orders array with:
 *   - id: string
 *   - date: string
 *   - package: string
 *   - photos: number
 * - Clicking "Reorder" should POST to /api/orders/{orderId}/reorder
 */
const Reorder = ({ pastOrders }) => {
  const handleReorder = async (orderId) => {
    try {
      // TODO: Implement API call
      // await axios.post(`/api/orders/${orderId}/reorder`);
      alert(`Order #${orderId} has been recreated!`);
    } catch (error) {
      console.error('Reorder failed:', error);
    }
  };

  return (
    <Card className={styles.portalCard}>
      <Card.Header as="h4">Past Orders</Card.Header>
      <Card.Body className="p-0">
        <div className={styles.responsiveTableContainer}>
          <Table striped hover className="mb-0">
            <thead className={styles.tableHeader}>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Package</th>
                <th>Photos</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pastOrders.map(order => (
                <tr key={order.id}>
                  <td data-label="Order ID">#{order.id}</td>
                  <td data-label="Date">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td data-label="Package">
                    <Badge bg="primary">{order.package}</Badge>
                  </td>
                  <td data-label="Photos">{order.photos}</td>
                  <td data-label="Action">
                    <Button 
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleReorder(order.id)}
                      className="w-100"
                    >
                      Reorder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Reorder;