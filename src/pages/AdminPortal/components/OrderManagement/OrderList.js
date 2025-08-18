import React, { useState } from 'react';
import { Card, Table, Button, Badge, Spinner, Dropdown, Modal, Form, ProgressBar} from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from '../../styles/Admin.module.css';
import { useOrders } from 'D:/reactforme/src/pages/hooks/useOrders.js';

/**
 * Enhanced Order Management - Admin Portal
 * Shows all orders with status management and video upload capability
 */
const OrderList = () => {
  const { orders, updateOrderStatus, uploadOrderVideo } = useOrders();
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Status options with visual variants
  const statusOptions = [
    { value: 'pending', label: 'Pending', variant: 'warning' },
    { value: 'processing', label: 'Processing', variant: 'primary' },
    { value: 'completed', label: 'Completed', variant: 'success' },
    { value: 'failed', label: 'Failed', variant: 'danger' }
  ];

  const handleStatusUpdate = async (orderId, newStatus) => {
    setProcessingId(orderId);
    try {
      updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status');
    } finally {
      setProcessingId(null);
    }
  };

  const handleUploadClick = (order) => {
    setSelectedOrder(order);
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleVideoUpload = async () => {
    if (!videoFile || !selectedOrder) return;
    
    setLoading(true);
    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) clearInterval(interval);
          return prev + 5;
        });
      }, 200);

      /**
       * TEMPORARY: Using local state
       * REPLACE WITH API CALL WHEN BACKEND IS READY:
       * const formData = new FormData();
       * formData.append('video', videoFile);
       * await axios.post(`/admin/orders/${selectedOrder.id}/video`, formData, {
       *   onUploadProgress: (progressEvent) => {
       *     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
       *     setUploadProgress(progress);
       *   }
       * });
       */
      await new Promise(resolve => setTimeout(resolve, 2000));
      uploadOrderVideo(selectedOrder.id, URL.createObjectURL(videoFile));
      
      setUploadProgress(100);
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadProgress(0);
        setVideoFile(null);
      }, 500);
    } catch (error) {
      console.error('Video upload failed:', error);
      alert('Failed to upload video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className={styles.adminCard}>
          <Card.Header className={styles.cardHeader}>
            <div className="d-flex justify-content-between align-items-center">
              <h5>Order Management</h5>
              <small className="text-muted">
                Showing {orders.length} orders
              </small>
            </div>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <div className="text-center py-4">
                <Spinner animation="border" />
              </div>
            ) : (
              <Table hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Client</th>
                    <th>Package</th>
                    <th>Photos</th>
                    <th>Status</th>
                    <th>Video</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const currentStatus = statusOptions.find(s => s.value === order.status);
                    return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.client}</td>
                        <td>{order.package}</td>
                        <td>{order.photos}</td>
                        <td>
                          <Badge bg={currentStatus?.variant || 'secondary'}>
                            {currentStatus?.label || order.status}
                          </Badge>
                        </td>
                        <td>
                          {order.videoUrl ? (
                            <Badge bg="success">Uploaded</Badge>
                          ) : (
                            <Badge bg="secondary">Pending</Badge>
                          )}
                        </td>
                        <td>{order.date}</td>
                        <td className="d-flex gap-2">
                          <Dropdown>
                            <Dropdown.Toggle 
                              variant="outline-primary" 
                              size="sm"
                              disabled={processingId === order.id}
                            >
                              {processingId === order.id ? (
                                <Spinner animation="border" size="sm" />
                              ) : 'Status'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {statusOptions.map((status) => (
                                <Dropdown.Item
                                  key={status.value}
                                  onClick={() => handleStatusUpdate(order.id, status.value)}
                                  disabled={order.status === status.value}
                                >
                                  <Badge bg={status.variant} className="me-2">
                                    {status.label}
                                  </Badge>
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                          
                          {order.status === 'completed' && (
                            <Button
                              variant={order.videoUrl ? "outline-success" : "outline-warning"}
                              size="sm"
                              onClick={() => handleUploadClick(order)}
                              disabled={processingId === order.id}
                            >
                              {order.videoUrl ? 'Replace Video' : 'Upload Video'}
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </motion.div>

      {/* Video Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video for Order #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Video File</Form.Label>
              <Form.Control 
                type="file" 
                accept="video/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              <Form.Text className="text-muted">
                Upload the final rendered video (MP4 format recommended)
              </Form.Text>
            </Form.Group>

            {uploadProgress > 0 && (
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Upload Progress:</span>
                  <span>{uploadProgress}%</span>
                </div>
                <ProgressBar now={uploadProgress} animated />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowUploadModal(false);
              setUploadProgress(0);
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleVideoUpload}
            disabled={!videoFile || loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Uploading...
              </>
            ) : 'Upload Video'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderList;