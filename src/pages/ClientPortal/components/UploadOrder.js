import React, { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';
import  {useOrders }  from 'D:/reactforme/src/pages/hooks/useOrders.js';

/**
 * Order upload component - Client Portal
 * @component
 * @param {Array} packages - Available pricing packages
 * @param {boolean} isLoading - Loading state (will be used with backend)
 */
const UploadOrder = ({ packages, isLoading: propLoading }) => {
  const { addOrder } = useOrders();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [addons, setAddons] = useState({
    voiceover: false,
    droneFootage: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedPkg = packages.find(p => p.id === selectedPackage);
      if (!selectedPkg) throw new Error('Please select a package');

      const newOrder = {
        package: selectedPkg.name,
        photos: selectedFiles.length,
        addons,
        // These will come from backend/auth:
        // clientId: 'current_client_id',
        // paymentMethod: 'stripe'
      };

      /**
       * TEMPORARY: Using local state
       * REPLACE WITH API CALL WHEN BACKEND IS READY:
       * try {
       *   const response = await axios.post('/api/orders', newOrder);
       *   // Handle response
       * } catch (error) {
       *   console.error('Order submission failed:', error);
       *   // Show error to user
       * }
       */
      addOrder(newOrder);

      // Reset form
      setSelectedFiles([]);
      setSelectedPackage('');
      setAddons({ voiceover: false, droneFootage: false });
      
      alert('Order submitted successfully!');
    } catch (error) {
      console.error('Order submission error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={styles.portalCard}>
      <Card.Header as="h4">Create New Order</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* File Upload */}
          <Form.Group className="mb-4">
            <Form.Label>Upload Property Photos</Form.Label>
            <Form.Control 
              type="file" 
              multiple 
              onChange={(e) => setSelectedFiles([...e.target.files])}
              accept="image/*"
              required
            />
            <Form.Text>
              Upload 5-30 high quality photos of your property
            </Form.Text>
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <small>{selectedFiles.length} files selected</small>
              </div>
            )}
          </Form.Group>

          {/* Package Selection */}
          <Form.Group className="mb-4">
            <Form.Label>Select Package</Form.Label>
            <div className={styles.packageOptions}>
              {packages.map(pkg => (
                <div 
                  key={pkg.id}
                  className={`${styles.packageCard} ${
                    selectedPackage === pkg.id ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <h5>{pkg.name}</h5>
                  <p>{pkg.photos} photos</p>
                  <p className={styles.price}>${pkg.price}</p>
                </div>
              ))}
            </div>
          </Form.Group>

          {/* Add-ons */}
          <Form.Group className="mb-4">
            <Form.Label>Add-ons</Form.Label>
            <Form.Check 
              type="checkbox"
              label="Professional Voiceover (+$25)"
              checked={addons.voiceover}
              onChange={(e) => setAddons({...addons, voiceover: e.target.checked})}
            />
            <Form.Check 
              type="checkbox"
              label="Drone Footage Integration (+$50)"
              checked={addons.droneFootage}
              onChange={(e) => setAddons({...addons, droneFootage: e.target.checked})}
            />
          </Form.Group>

          {/* Submit Button */}
          <Button 
            variant="primary" 
            type="submit"
            disabled={!selectedFiles.length || !selectedPackage || isSubmitting || propLoading}
            className="w-100"
          >
            {isSubmitting || propLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Processing...
              </>
            ) : 'Submit Order'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Default props for local development
UploadOrder.defaultProps = {
  packages: [
    { id: 1, name: 'Starter', photos: '5-10', price: 49 },
    { id: 2, name: 'Professional', photos: '11-20', price: 99 },
    { id: 3, name: 'Premium', photos: '21-30', price: 149 }
  ],
  isLoading: false
};

export default UploadOrder;