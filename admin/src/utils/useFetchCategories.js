import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCategories = (filter = true) => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          const filteredData = filter
            ? response.data.filter((data) => data.parentCategory == null)
            : response.data;
          setCategories(filteredData);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, [filter, token]);

  return categories;
};

export default useFetchCategories;
