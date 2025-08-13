import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import styles from '../../styles/Admin.module.css';

/**
 * Manages notification settings
 * API: GET/PUT /admin/notifications
 */
const AlertsPanel = () => {
  const [settings, setSettings] = useState({
    orderCompleted: true,
    orderFailed: true,
    systemAlerts: false
  });

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const handleSave = () => {
    // API: PUT /admin/notifications { settings }
    console.log('Updated settings:', settings);
  };

  return (
    <Card className={styles.adminCard}>
      <Card.Header className={styles.cardHeader}>
        <h5>Notification Settings</h5>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>Order Completed</span>
            <Form.Check
              type="switch"
              checked={settings.orderCompleted}
              onChange={() => handleToggle('orderCompleted')}
            />
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>Order Failed</span>
            <Form.Check
              type="switch"
              checked={settings.orderFailed}
              onChange={() => handleToggle('orderFailed')}
            />
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>System Alerts</span>
            <Form.Check
              type="switch"
              checked={settings.systemAlerts}
              onChange={() => handleToggle('systemAlerts')}
            />
          </ListGroup.Item>
        </ListGroup>
        <Button onClick={handleSave} className="mt-3">
          Save Settings
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AlertsPanel;