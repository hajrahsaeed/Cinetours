import React from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

/**
 * Displays invoice history with download options
 * @component
 * @param {Array} invoices - Array of invoice objects
 * 
 * Backend Integration:
 * - Expects invoices array with:
 *   - id: string
 *   - date: string
 *   - amount: number
 *   - status: 'paid'|'pending'|'failed'
 *   - downloadUrl: string (API endpoint)
 * - Download should GET /api/invoices/{id}
 */
const Invoices = ({ invoices }) => {
  const handleDownload = async (invoiceId) => {
    try {
      // TODO: Implement API call
      // const response = await axios.get(`/api/invoices/${invoiceId}`, {
      //   responseType: 'blob'
      // });
      // Trigger file download
      alert(`Invoice #${invoiceId} download started`);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const statusVariant = {
    paid: 'success',
    pending: 'warning',
    failed: 'danger'
  };

  return (
    <Card className={styles.portalCard}>
      <Card.Header as="h4">Invoice History</Card.Header>
      <Card.Body className="p-0">
        <div className={styles.responsiveTableContainer}>
          <Table striped hover className="mb-0">
            <thead className={styles.tableHeader}>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <td data-label="Invoice #">#{invoice.id}</td>
                  <td data-label="Date">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td data-label="Amount">${invoice.amount.toFixed(2)}</td>
                  <td data-label="Status">
                    <Badge bg={statusVariant[invoice.status]}>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td data-label="Action">
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleDownload(invoice.id)}
                      disabled={invoice.status !== 'paid'}
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

export default Invoices;