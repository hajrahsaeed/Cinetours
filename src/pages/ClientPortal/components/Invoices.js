import React from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import styles from './Invoices.module.css';

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

  return (
    <Card className={styles.invoiceCard}>
      <Card.Header as="h4" className={styles.invoiceHeader}>
        Invoice History
      </Card.Header>
      <Card.Body className={`p-0 ${styles.invoiceBody}`}>
        <div className={styles.invoiceTableWrapper}>
          <Table className={`mb-0 ${styles.invoiceTable}`}>
            <thead className={styles.invoiceTableHead}>
              <tr>
                <th className={styles.invoiceTableHeading}>Invoice #</th>
                <th className={styles.invoiceTableHeading}>Date</th>
                <th className={styles.invoiceTableHeading}>Amount</th>
                <th className={styles.invoiceTableHeading}>Status</th>
                <th className={styles.invoiceTableHeading}>Action</th>
              </tr>
            </thead>
            <tbody className={styles.invoiceTableBody}>
              {invoices.map(invoice => (
                <tr key={invoice.id} className={styles.invoiceRow}>
                  <td data-label="Invoice #" className={styles.invoiceCell}>
                    #{invoice.id}
                  </td>
                  <td data-label="Date" className={styles.invoiceCell}>
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td data-label="Amount" className={styles.invoiceCell}>
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td data-label="Status" className={styles.invoiceCell}>
                    <Badge className={`${styles.invoiceStatus} ${styles[`status_${invoice.status}`]}`}>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td data-label="Action" className={styles.invoiceCell}>
                    <Button
                      onClick={() => handleDownload(invoice.id)}
                      disabled={invoice.status !== 'paid'}
                      className={styles.invoiceDownloadBtn}
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
