import React, { useState } from 'react';
import { Card, Table, Button, Badge, Spinner, Dropdown, Modal, Form, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from './OrderList.module.css';
import { useOrders } from '../../../hooks/useOrders';

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

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' }
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
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) clearInterval(interval);
          return prev + 5;
        });
      }, 200);

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
          <Card.Header className={styles.adminCardHeader}>
            <div className={`d-flex justify-content-between align-items-center ${styles.headerContent}`}>
              <h5 className={styles.headerTitle}>Order Management</h5>
              <small className={styles.headerSubtitle}>
                Showing {orders.length} orders
              </small>
            </div>
          </Card.Header>
          <Card.Body className={styles.adminCardBody}>
            {loading ? (
              <div className={`text-center py-4 ${styles.loadingContainer}`}>
                <Spinner animation="border" className={styles.loadingSpinner} />
              </div>
            ) : (
              <Table responsive className={`mb-0 ${styles.orderTable}`}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Order ID</th>
                    <th className={styles.tableHeaderCell}>Client</th>
                    <th className={styles.tableHeaderCell}>Package</th>
                    <th className={styles.tableHeaderCell}>Photos</th>
                    <th className={styles.tableHeaderCell}>Status</th>
                    <th className={styles.tableHeaderCell}>Video</th>
                    <th className={styles.tableHeaderCell}>Date</th>
                    <th className={styles.tableHeaderCell}>Actions</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {orders.map((order) => {
                    const currentStatus = statusOptions.find(s => s.value === order.status);
                    return (
                      <tr key={order.id} className={styles.tableRow}>
                        <td className={styles.tableCell}>{order.id}</td>
                        <td className={styles.tableCell}>{order.client}</td>
                        <td className={styles.tableCell}>{order.package}</td>
                        <td className={styles.tableCell}>{order.photos}</td>
                        <td className={styles.tableCell}>
                          <Badge className={`${styles.statusBadge} ${styles[`status_${order.status}`]}`}>
                            {currentStatus?.label || order.status}
                          </Badge>
                        </td>
                        <td className={styles.tableCell}>
                          {order.videoUrl ? (
                            <Badge className={`${styles.videoBadge} ${styles.videoUploaded}`}>Uploaded</Badge>
                          ) : (
                            <Badge className={`${styles.videoBadge} ${styles.videoPending}`}>Pending</Badge>
                          )}
                        </td>
                        <td className={styles.tableCell}>{order.date}</td>
                        <td className={`d-flex gap-2 ${styles.actionCell}`}>
                          <Dropdown className={styles.statusDropdown}>
                            <Dropdown.Toggle
                              size="sm"
                              disabled={processingId === order.id}
                              className={styles.statusDropdownToggle}
                            >
                              {processingId === order.id ? (
                                <Spinner animation="border" size="sm" className={styles.statusSpinner} />
                              ) : 'Status'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles.statusDropdownMenu}>
                              {statusOptions.map((status) => (
                                <Dropdown.Item
                                  key={status.value}
                                  onClick={() => handleStatusUpdate(order.id, status.value)}
                                  disabled={order.status === status.value}
                                  className={styles.statusDropdownItem}
                                >
                                  <span className={`${styles.statusOption} ${styles[`status_${status.value}`]}`}>
                                    {status.label}
                                  </span>
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>

                          {order.status === 'completed' && (
                            <Button
                              size="sm"
                              onClick={() => handleUploadClick(order)}
                              disabled={processingId === order.id}
                              className={`${styles.uploadButton} ${order.videoUrl ? styles.uploadReplace : styles.uploadNew}`}
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
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} className={styles.uploadModal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            Upload Video for Order #{selectedOrder?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form className={styles.uploadForm}>
            <Form.Group className={styles.uploadFormGroup}>
              <Form.Label className={styles.uploadLabel}>Select Video File</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={loading}
                className={styles.uploadInput}
              />
              <Form.Text className={styles.uploadHint}>
                Upload the final rendered video (MP4 format recommended)
              </Form.Text>
            </Form.Group>

            {uploadProgress > 0 && (
              <div className={styles.uploadProgressContainer}>
                <div className={styles.uploadProgressHeader}>
                  <span>Upload Progress:</span>
                  <span>{uploadProgress}%</span>
                </div>
                <ProgressBar now={uploadProgress} animated className={styles.uploadProgressBar} />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            onClick={() => {
              setShowUploadModal(false);
              setUploadProgress(0);
            }}
            disabled={loading}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVideoUpload}
            disabled={!videoFile || loading}
            className={styles.confirmButton}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className={styles.uploadSpinner} />
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
