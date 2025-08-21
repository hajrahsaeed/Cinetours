import React, { useState } from 'react';
import { Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import styles from './DownloadCenter.module.css';

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
      const response = await fetch(`/api/videos/${videoId}/download-url`);
      const { url } = await response.json();

      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoName}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download video. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Card className={`${styles.portalCard} ${styles.downloadCenterCard}`}>
      <Card.Header as="h4" className={styles.downloadCenterHeader}>
        Your Videos
      </Card.Header>

      <Card.Body className={`${styles.downloadCenterBody} p-0`}>
        {error && (
          <Alert variant="danger" className={`${styles.downloadCenterAlert} m-3`}>
            {error}
          </Alert>
        )}

        <div className={styles.downloadCenterTableWrapper}>
          <Table striped hover className={`${styles.downloadCenterTable} mb-0`}>
            <thead className={styles.downloadCenterTableHeader}>
              <tr>
                <th className={styles.tableColVideo}>Video Name</th>
                <th className={`${styles.tableColOrder} text-nowrap`}>Order ID</th>
                <th className={`${styles.tableColDate} text-nowrap`}>Created Date</th>
                <th className={styles.tableColAction}>Action</th>
              </tr>
            </thead>
            <tbody className={styles.downloadCenterTableBody}>
              {videos.map(video => (
                <tr key={video.id} className={styles.downloadCenterRow}>
                  <td data-label="Video Name" className={styles.tableCellVideo}>
                    {video.name}
                  </td>
                  <td data-label="Order ID" className={styles.tableCellOrder}>
                    #{video.orderId}
                  </td>
                  <td data-label="Created Date" className={styles.tableCellDate}>
                    {new Date(video.created).toLocaleDateString()}
                  </td>
                  <td data-label="Action" className={styles.tableCellAction}>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleDownload(video.id, video.name)}
                      disabled={downloadingId === video.id}
                      className={`${styles.downloadButton} w-100`}
                    >
                      {downloadingId === video.id ? (
                        <>
                          <Spinner animation="border" size="sm" className={styles.downloadSpinner} />
                          Downloading...
                        </>
                      ) : (
                        'Download'
                      )}
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
