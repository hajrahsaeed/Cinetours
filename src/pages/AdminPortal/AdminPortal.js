import React, { useState } from 'react';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';
import styles from './styles/Admin.module.css';
import OrderManagement from './components/OrderManagement/OrderList';
import PromptFeedback from './components/PromptFeedback/PromptViewer';
import LogsStatus from './components/LogsStatus/JobTracker';
import ClientManagement from './components/ClientManagement/ClientList';
import PricingEditor from './components/PricingEditor/PricingForm';
import Notifications from './components/Notifications/AlertsPanel';

/**
 * Admin Portal Main Layout
 * Tab-based navigation for all admin features
 * 
 * Backend Requirements:
 * - Authentication middleware for admin routes
 * - Role-based access control (RBAC)
 */
const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <Container fluid className={styles.adminContainer}>
      <Row>
        <Col md={3} className={styles.sidebar}>
          <div className={styles.adminHeader}>
            <h2>Admin Portal</h2>
            <p className={styles.adminRole}>Administrator</p>
          </div>
          
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link 
                eventKey="orders" 
                onClick={() => setActiveTab('orders')}
                className={activeTab === 'orders' ? styles.activeTab : ''}
              >
                <i className="bi bi-card-checklist"></i> Order Management
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="prompts" 
                onClick={() => setActiveTab('prompts')}
                className={activeTab === 'prompts' ? styles.activeTab : ''}
              >
                <i className="bi bi-chat-square-text"></i> Prompt Feedback
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="logs" 
                onClick={() => setActiveTab('logs')}
                className={activeTab === 'logs' ? styles.activeTab : ''}
              >
                <i className="bi bi-clipboard2-data"></i> Logs & Status
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="clients" 
                onClick={() => setActiveTab('clients')}
                className={activeTab === 'clients' ? styles.activeTab : ''}
              >
                <i className="bi bi-people"></i> Client Management
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="pricing" 
                onClick={() => setActiveTab('pricing')}
                className={activeTab === 'pricing' ? styles.activeTab : ''}
              >
                <i className="bi bi-tag"></i> Pricing Editor
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="notifications" 
                onClick={() => setActiveTab('notifications')}
                className={activeTab === 'notifications' ? styles.activeTab : ''}
              >
                <i className="bi bi-bell"></i> Notifications
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col md={9} className={styles.contentArea}>
          <Tab.Content>
            <Tab.Pane active={activeTab === 'orders'}>
              <OrderManagement />
            </Tab.Pane>
            <Tab.Pane active={activeTab === 'prompts'}>
              <PromptFeedback />
            </Tab.Pane>
            <Tab.Pane active={activeTab === 'logs'}>
              <LogsStatus />
            </Tab.Pane>
            <Tab.Pane active={activeTab === 'clients'}>
              <ClientManagement />
            </Tab.Pane>
            <Tab.Pane active={activeTab === 'pricing'}>
              <PricingEditor />
            </Tab.Pane>
            <Tab.Pane active={activeTab === 'notifications'}>
              <Notifications />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPortal;