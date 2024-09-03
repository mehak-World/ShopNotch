// src/hooks/useCategoryData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategoryData = (token) => {
  const [catData, setCatData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          const filteredData = response.data.filter((data) => data.parentCategory == null);
          setCatData(filteredData);
        }
      } catch (error) {
        setError('Error fetching categories');
        console.error(error);
      }
    };
    fetchData();

  }, [token]);

  return { catData, error };
};

export default useCategoryData;
