import React, { useState } from 'react';
import { Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import styles from '../styles/Portal.module.css';

const DownloadCenter = ({ videos, onDownload }) => {
  const [downloadingId, setDownloadingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = async (videoId, videoName) => {
  const video = videos.find(v => v.id === videoId);
  if (!video?.downloadUrl) {
    setError('No download URL available');
    return;
  }

  const a = document.createElement('a');
  a.href = video.downloadUrl;
  a.download = `${videoName}.mp4`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

    
    try {
      // 1. First get the download URL from your backend
      const response = await fetch(`/api/videos/${videoId}/download-url`);
      const { url } = await response.json();
      
      // 2. Create a temporary anchor element to trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoName}.mp4`; // Set the filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // 3. Revoke the object URL to free memory
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download video. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Card className={styles.portalCard}>
      <Card.Header as="h4">Your Videos</Card.Header>
      <Card.Body className="p-0">
        {error && <Alert variant="danger" className="m-3">{error}</Alert>}
        <div className={styles.responsiveTableContainer}>
          <Table striped hover className="mb-0">
            <thead className={styles.tableHeader}>
              <tr>
                <th>Video Name</th>
                <th className="text-nowrap">Order ID</th>
                <th className="text-nowrap">Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.id}>
                  <td data-label="Video Name">{video.name}</td>
                  <td data-label="Order ID">#{video.orderId}</td>
                  <td data-label="Created Date">
                    {new Date(video.created).toLocaleDateString()}
                  </td>
                  <td data-label="Action">
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleDownload(video.id, video.name)}
                      disabled={downloadingId === video.id}
                      className="w-100"
                    >
                      {downloadingId === video.id ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Downloading...
                        </>
                      ) : 'Download'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DownloadCenter;