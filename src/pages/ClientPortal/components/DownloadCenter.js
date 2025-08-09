import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

/**
 * Lists completed videos with download options
 * @component
 * @param {Array} videos - Array of video objects
 * @param {function} onDownload - Download handler
 * 
 * Backend Integration:
 * - Expects videos array with:
 *   - id: string
 *   - orderId: string
 *   - name: string
 *   - downloadUrl: string (API endpoint)
 *   - created: string (ISO date)
 */
const DownloadCenter = ({ videos, onDownload }) => {
  return (
    <Card className={styles.portalCard}>
      <Card.Header as="h4">Your Videos</Card.Header>
      <Card.Body className="p-0">
        <div className={styles.responsiveTableContainer}>
          <Table striped hover className="mb-0">
            <thead className={styles.tableHeader}>
              <tr>
                <th>Video Name</th>
                <th className="text-nowrap">Order ID</th>
                <th className="text-nowrap">Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.id}>
                  <td data-label="Video Name">{video.name}</td>
                  <td data-label="Order ID">#{video.orderId}</td>
                  <td data-label="Created Date">
                    {new Date(video.created).toLocaleDateString()}
                  </td>
                  <td data-label="Action">
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onDownload(video.id)}
                      className="w-100"
                    >
                      Download
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

export default DownloadCenter;