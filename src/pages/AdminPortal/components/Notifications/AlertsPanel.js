import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import styles from './Notifications.module.css';

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
        <h5 className={styles.cardTitle}>Notification Settings</h5>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <ListGroup className={styles.listGroup}>
          <ListGroup.Item className={styles.listItem}>
            <span className={styles.itemLabel}>Order Completed</span>
            <Form.Check
              type="switch"
              checked={settings.orderCompleted}
              onChange={() => handleToggle('orderCompleted')}
              className={styles.switchInput}
            />
          </ListGroup.Item>
          <ListGroup.Item className={styles.listItem}>
            <span className={styles.itemLabel}>Order Failed</span>
            <Form.Check
              type="switch"
              checked={settings.orderFailed}
              onChange={() => handleToggle('orderFailed')}
              className={styles.switchInput}
            />
          </ListGroup.Item>
          <ListGroup.Item className={styles.listItem}>
            <span className={styles.itemLabel}>System Alerts</span>
            <Form.Check
              type="switch"
              checked={settings.systemAlerts}
              onChange={() => handleToggle('systemAlerts')}
              className={styles.switchInput}
            />
          </ListGroup.Item>
        </ListGroup>
        <div className={styles.buttonWrapper}>
          <Button onClick={handleSave} className={styles.saveButton}>
            Save Settings
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AlertsPanel;
