import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PortalLayout from './PortalLayout';
import UploadOrder from './components/UploadOrder';
import OrderStatus from './components/OrderStatus';
import DownloadCenter from './components/DownloadCenter';
import BrandAssets from './components/BrandAssets';
import Reorder from './components/Reorder';
import Invoices from './components/Invoices';
import usePortalData from './hooks/usePortalData';
import styles from './styles/Portal.module.css';

/**
 * Client Portal main page - Handles routing between portal sections
 * @component
 * 
 * Note for backend developers:
 * - All data fetching is handled in usePortalData hook
 * - API endpoints should be added there
 * - Each section receives data via props
 */
const ClientPortal = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('upload');
  
  // Fetch all portal data (backend integration point)
  const {
    orders,
    videos,
    brandAssets,
    invoices,
    isLoading,
    error,
    uploadPhotos,
    downloadVideo,
    updateBrandAssets
  } = usePortalData();

  return (
    <Container fluid className={styles.portalContainer}>
      <PortalLayout 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {/* Conditional rendering based on active tab */}
        {activeTab === 'upload' && (
          <UploadOrder 
            packages={PACKAGE_OPTIONS} 
            onSubmit={uploadPhotos}
            isLoading={isLoading}
          />
        )}
        
        {activeTab === 'status' && (
          <OrderStatus 
            orders={orders} 
            loading={isLoading}
          />
        )}
        
        {activeTab === 'downloads' && (
          <DownloadCenter 
            videos={videos} 
            onDownload={downloadVideo}
          />
        )}
        
        {activeTab === 'branding' && (
          <BrandAssets 
            assets={brandAssets}
            onUpdate={updateBrandAssets}
          />
        )}
        
        {activeTab === 'reorder' && (
          <Reorder 
            pastOrders={orders.filter(o => o.status === 'delivered')} 
          />
        )}
        
        {activeTab === 'invoices' && (
          <Invoices 
            invoices={invoices} 
          />
        )}
      </PortalLayout>
    </Container>
  );
};

// Mock data - Replace with API calls
const PACKAGE_OPTIONS = [
  { id: 1, name: 'Starter', photos: '5-10', price: 49 },
  { id: 2, name: 'Professional', photos: '11-20', price: 99 },
  { id: 3, name: 'Premium', photos: '21-30', price: 149 }
];

export default ClientPortal;