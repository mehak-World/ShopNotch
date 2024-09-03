// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryData from '../utils/useCategoryData';
import CategoryList from './CategoryList';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const { catData, error } = useCategoryData(token);
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-black text-white p-10 text-2xl">Dashboard</div>
      <div>
        <button className="bg-black text-white m-5 p-2 rounded-lg" onClick={() => navigate("/category/create")}>
          Create a category
        </button>
      </div>

      <div>
        <button className="bg-black text-white m-5 p-2 rounded-lg" onClick={() => navigate("/product/create")}>
          Create a product
        </button>
      </div>

      {error ? (
        <div className="m-8 text-red-500">{error}</div>
      ) : (
        <div className="m-8">
          <CategoryList categories={catData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
