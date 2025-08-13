import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import styles from '../../styles/Admin.module.css';

/**
 * Displays client list with usage stats
 * API: GET /admin/clients
 */
const ClientList = () => {
  const clients = [
    {
      id: 'cl_123',
      name: 'John Doe',
      email: 'john@example.com',
      joined: '2023-01-15',
      orders: 12
    }
  ];

  return (
    <Card className={styles.adminCard}>
      <Card.Header className={styles.cardHeader}>
        <div className="d-flex justify-content-between">
          <h5>Client Management</h5>
          <Button size="sm" variant="outline-primary">
            Export
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.joined}</td>
                <td>{client.orders}</td>
                <td>
                  <Button size="sm" variant="outline-secondary">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ClientList;