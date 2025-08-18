
import React, { useState } from 'react';
import { Card, Form, Button, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from '../../styles/Admin.module.css';
import useAdminData from '../../hooks/useAdminData';

const PricingForm = () => {
  const { pricing, updatePricingLocal } = useAdminData();
  const [editingId, setEditingId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  const handleEditClick = (id, currentPrice) => {
    setEditingId(id);
    setTempPrice(currentPrice);
  };

  const handleSave = (id) => {
    if (!tempPrice || isNaN(tempPrice)) {
      alert('Please enter a valid price');
      return;
    }
    
    // TODO: Backend Integration - Replace with API call
    // This currently only updates local state
    // In future, should make PUT request to save to database
    // Example:
    // try {
    //   await axios.put('/api/pricing', { id, price: Number(tempPrice) });
    //   updatePricingLocal(id, Number(tempPrice)); // Update local state after successful API call
    // } catch (err) {
    //   console.error('Failed to update pricing:', err);
    //   alert('Failed to save changes');
    // }
    
    updatePricingLocal(id, Number(tempPrice));
    setEditingId(null);
    setTempPrice('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${styles.adminCard} mb-4`}>
        <Card.Header className={styles.cardHeader}>
          <h5>Package Pricing Editor</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Package</th>
                <th>Photos</th>
                <th>Turnaround</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((pkg) => (
                <tr key={pkg.id}>
                  <td>{pkg.name}</td>
                  <td>{pkg.photos}</td>
                  <td>{pkg.turnaround}</td>
                  <td>
                    {editingId === pkg.id ? (
                      <Form.Control
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(e.target.value)}
                        size="sm"
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span>${pkg.price}</span>
                    )}
                  </td>
                  <td>
                    {editingId === pkg.id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleSave(pkg.id)}
                          className="me-2"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditClick(pkg.id, pkg.price)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Preview Card */}
      <Card className={styles.adminCard}>
        <Card.Header className={styles.cardHeader}>
          <h5>Pricing Preview</h5>
        </Card.Header>
        <Card.Body>
          <div className={styles.pricingPreview}>
            {pricing.map((pkg) => (
              <motion.div 
                key={pkg.id}
                className={styles.pricingCard}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h6>{pkg.name}</h6>
                <div className={styles.price}>${pkg.price}</div>
                <div className={styles.details}>
                  <span>{pkg.photos} photos</span>
                  <span>{pkg.turnaround}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default PricingForm;