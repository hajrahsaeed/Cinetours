import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import styles from './styles/Portal.module.css';

/**
 * Portal layout with navigation sidebar
 * @component
 * @param {string} activeTab - Currently active tab
 * @param {function} setActiveTab - Tab change handler
 * @param {ReactNode} children - Tab content to render
 */
const PortalLayout = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className={styles.portalWrapper}>
      {/* Sidebar Navigation */}
      <div className={styles.sidebar}>
        <h3 className={styles.portalTitle}>Client Portal</h3>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'upload'} 
              onClick={() => setActiveTab('upload')}
            >
              <i className="bi bi-cloud-arrow-up"></i> Upload Order
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'status'} 
              onClick={() => setActiveTab('status')}
            >
              <i className="bi bi-clock-history"></i> Order Status
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'downloads'} 
              onClick={() => setActiveTab('downloads')}
            >
              <i className="bi bi-download"></i> Download Center
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'branding'} 
              onClick={() => setActiveTab('branding')}
            >
              <i className="bi bi-palette"></i> Brand Assets
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'reorder'} 
              onClick={() => setActiveTab('reorder')}
            >
              <i className="bi bi-arrow-repeat"></i> Reorder
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'invoices'} 
              onClick={() => setActiveTab('invoices')}
            >
              <i className="bi bi-receipt"></i> Invoices
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* Main Content Area */}
      <div className={styles.contentArea}>
        {children}
      </div>
    </div>
  );
};

export default PortalLayout;