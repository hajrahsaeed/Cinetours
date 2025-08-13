import React, { useState } from 'react';
import { Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import styles from '../../styles/Admin.module.css';

/**
 * Shows prompt and allows feedback submission
 * API: POST /admin/feedback
 */
const PromptViewer = () => {
  const [feedback, setFeedback] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  const handleSubmit = (e) => {
    e.preventDefault();
    // API: POST /admin/feedback { promptId, feedback }
    console.log('Feedback submitted:', feedback);
  };

  return (
    <Card className={styles.adminCard}>
      <Card.Header>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Tab eventKey="current" title="Current Prompt" />
          <Tab eventKey="history" title="Version History" />
        </Tabs>
      </Card.Header>
      <Card.Body>
        {activeTab === 'current' ? (
          <>
            <div className="mb-4">
              <h6>Original Prompt:</h6>
              <p className="text-muted">
                "Create a bright and airy video tour of this modern 3-bedroom apartment"
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Your Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Request Regeneration
              </Button>
            </Form>
          </>
        ) : (
          <div>Version history will appear here</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PromptViewer;