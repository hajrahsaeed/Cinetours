import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PortalLayout from './PortalLayout';
import UploadOrder from './components/UploadOrder';
import OrderStatus from './components/OrderStatus';
import DownloadCenter from './components/DownloadCenter';
import BrandAssets from './components/BrandAssets';
import Reorder from './components/Reorder';
import Invoices from './components/Invoices';
import { useOrders } from 'D:/reactforme/src/pages/hooks/useOrders.js';
import styles from './styles/Portal.module.css';

// Mock data for packages (replace with API fetch when backend is ready)
const PACKAGE_OPTIONS = [
  { id: 1, name: 'Starter', photos: '5-10', price: 49 },
  { id: 2, name: 'Professional', photos: '11-20', price: 99 },
  { id: 3, name: 'Premium', photos: '21-30', price: 149 }
];

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const { orders, addOrder } = useOrders();
  const [isLoading, setIsLoading] = useState(false);

  // Mock function for uploading photos (replace with API call)
  const uploadPhotos = async (orderData) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      addOrder(orderData);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Order submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function for downloading videos (replace with API call)
  const downloadVideo = async (videoId) => {
    alert(`Downloading video ${videoId} (will be implemented with backend)`);
  };

  // Mock function for updating brand assets (replace with API call)
  const updateBrandAssets = async (assets) => {
    alert(`Brand assets updated (will be implemented with backend)`);
    console.log('Updated assets:', assets);
  };

  

  return (
    <Container fluid className={styles.portalContainer}>
      <PortalLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'upload' && (
          <UploadOrder 
            packages={PACKAGE_OPTIONS}
            onSubmit={uploadPhotos}
            isLoading={isLoading}
          />
        )}
        
        {activeTab === 'status' && (
          <OrderStatus 
            orders={orders.filter(o => o.status !== 'completed')}
            loading={isLoading}
          />
        )}
        
        {activeTab === 'downloads' && (
          <DownloadCenter 
            videos={orders
              .filter(o => o.status === 'completed')
              .map(o => ({
                id: o.id,
                orderId: o.id,
                name: `${o.package} Package Video`,
                downloadUrl: '#',
                created: o.date
              }))
            }
            onDownload={downloadVideo}
          />
        )}
        
        {activeTab === 'branding' && (
          <BrandAssets 
            assets={{
              logo: '/assets/logo-placeholder.png',
              colorScheme: '#21ABB5',
              font: 'Montserrat'
            }}
            onUpdate={updateBrandAssets}
          />
        )}
        
        {activeTab === 'reorder' && (
          <Reorder 
            pastOrders={orders.filter(o => o.status === 'completed')} 
          />
        )}
        
        {activeTab === 'invoices' && (
          <Invoices 
            invoices={orders.map(o => ({
              id: o.id,
              date: o.date,
              amount: PACKAGE_OPTIONS.find(p => p.name === o.package)?.price || 0,
              status: 'paid'
            }))}
          />
        )}
      </PortalLayout>
    </Container>
  );
};

export default ClientPortal;