import React, { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

/**
 * Order upload component with photo selection and package options
 * @component
 * @param {Array} packages - Available pricing packages
 * @param {function} onSubmit - Submission handler
 * @param {boolean} isLoading - Loading state
 */
const UploadOrder = ({ packages, onSubmit, isLoading }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [addons, setAddons] = useState({
    voiceover: false,
    droneFootage: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      files: selectedFiles,
      package: selectedPackage,
      addons
    });
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
            />
            <Form.Text>
              Upload 5-30 high quality photos of your property
            </Form.Text>
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
            disabled={!selectedFiles.length || !selectedPackage || isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Processing...
              </>
            ) : 'Submit Order'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UploadOrder;