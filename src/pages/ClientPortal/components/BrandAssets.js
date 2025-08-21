import React, { useState } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import styles from './BrandAssets.module.css';

const BrandAssets = ({ assets, onUpdate }) => {
  const [formData, setFormData] = useState(assets);
  const [logoPreview, setLogoPreview] = useState(assets.logo);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setFormData({ ...formData, logo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      alert('Brand assets updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Card className={styles.portalCard}>
      <Card.Header as="h4" className={styles.cardHeader}>
        Brand Assets
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <Form onSubmit={handleSubmit} className={styles.brandForm}>
          
          {/* Logo Upload */}
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Company Logo</Form.Label>
            <div className={styles.logoUploadWrapper}>
              <Image 
                src={logoPreview} 
                alt="Logo preview" 
                width={80} 
                className={styles.logoPreview}
              />
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
            </div>
          </Form.Group>

          {/* Color Scheme */}
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Primary Color</Form.Label>
            <Form.Control
              type="color"
              value={formData.colorScheme}
              onChange={(e) => setFormData({...formData, colorScheme: e.target.value})}
              className={styles.colorPicker}
            />
          </Form.Group>

          {/* Font Selection */}
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Font Family</Form.Label>
            <Form.Select
              value={formData.font}
              onChange={(e) => setFormData({...formData, font: e.target.value})}
              className={styles.fontSelect}
            >
              <option>Montserrat</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Playfair Display</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className={styles.submitButton}>
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BrandAssets;
