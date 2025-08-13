import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import styles from '../../styles/Admin.module.css';

/**
 * Displays detailed job processing logs
 * API: GET /admin/jobs/:id/logs
 */
const JobTracker = () => {
  const logs = [
    {
      id: 1,
      timestamp: '2023-06-15 09:30:22',
      status: 'processing',
      message: 'Video generation started'
    },
    {
      id: 2,
      timestamp: '2023-06-15 09:32:45',
      status: 'success',
      message: 'AI models loaded successfully'
    }
  ];

  const statusVariant = {
    processing: 'info',
    success: 'success',
    error: 'danger'
  };

  return (
    <Card className={styles.adminCard}>
      <Card.Header className={styles.cardHeader}>
        <h5>Job Processing Logs</h5>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {logs.map((log) => (
            <ListGroup.Item key={log.id}>
              <div className="d-flex justify-content-between">
                <span>
                  <Badge bg={statusVariant[log.status]} className="me-2">
                    {log.status}
                  </Badge>
                  {log.message}
                </span>
                <small className="text-muted">{log.timestamp}</small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default JobTracker;