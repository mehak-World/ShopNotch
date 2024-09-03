import React from 'react';
import useFetchCategories from '../utils/useFetchCategories';
import CategoryForm from './CategoryForm';

const AddCategory = () => {
  const token = localStorage.getItem('token');
  const catData = useFetchCategories(token);

  return (
    <div className="max-w-[500px] relative mx-auto my-20">
      <h2 className="font-bold text-2xl mb-6">Add Category</h2>
      <CategoryForm catData={catData} token={token} />
    </div>
  );
};

export default AddCategory;
