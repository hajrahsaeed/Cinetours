import React, { useState } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

/**
 * Manages branding assets (logo, colors, fonts)
 * @component
 * @param {Object} assets - Current branding assets
 * @param {function} onUpdate - Update handler
 * 
 * Backend Integration:
 * - Expects assets object with:
 *   - logo: string (URL)
 *   - introVideo: string (URL)
 *   - font: string
 *   - colorScheme: string (hex)
 * - onUpdate should POST to /api/branding
 */
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
      <Card.Header as="h4">Brand Assets</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Logo Upload */}
          <Form.Group className="mb-4">
            <Form.Label>Company Logo</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <Image 
                src={logoPreview} 
                alt="Logo preview" 
                width={80} 
                className="border p-2"
              />
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </Form.Group>

          {/* Color Scheme */}
          <Form.Group className="mb-4">
            <Form.Label>Primary Color</Form.Label>
            <Form.Control
              type="color"
              value={formData.colorScheme}
              onChange={(e) => setFormData({...formData, colorScheme: e.target.value})}
            />
          </Form.Group>

          {/* Font Selection */}
          <Form.Group className="mb-4">
            <Form.Label>Font Family</Form.Label>
            <Form.Select
              value={formData.font}
              onChange={(e) => setFormData({...formData, font: e.target.value})}
            >
              <option>Montserrat</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Playfair Display</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BrandAssets;