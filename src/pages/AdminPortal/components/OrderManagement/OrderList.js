import React from 'react';
import { Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from '../../styles/Admin.module.css';

/**
 * Displays all orders with filtering capabilities
 * API: GET /admin/orders
 */
const OrderList = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Mock data fetch - replace with actual API call
  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with: const res = await api.get('/admin/orders');
        const mockOrders = [
          {
            id: 'ord_123',
            client: 'John Doe',
            status: 'processing',
            thumbnail: '/assets/sample-property.jpg',
            date: '2023-06-15'
          }
        ];
        setOrders(mockOrders);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusVariant = {
    pending: 'warning',
    processing: 'primary',
    completed: 'success',
    failed: 'danger'
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className={styles.adminCard}>
        <Card.Header className={styles.cardHeader}>
          <h5>Order Management</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Client</th>
                  <th>Thumbnail</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.client}</td>
                    <td>
                      <img 
                        src={order.thumbnail} 
                        alt="Property" 
                        width={60} 
                        className="rounded"
                      />
                    </td>
                    <td>
                      <Badge bg={statusVariant[order.status]}>
                        {order.status}
                      </Badge>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <Button size="sm" variant="outline-primary">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default OrderList;