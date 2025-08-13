// src/pages/AdminPortal/hooks/useApi.js
import axios from 'axios';
import { useState } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (config) => {
    try {
      setLoading(true);
      const response = await axios(config);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    get: (url) => request({ method: 'get', url }),
    post: (url, data) => request({ method: 'post', url, data }),
    loading,
    error
  };
};

export default useApi;