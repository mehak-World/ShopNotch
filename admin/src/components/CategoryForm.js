import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import ParentCategorySelector from './ParentCategorySelector';

const CategoryForm = ({ catData, token }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [parentCategory, setParentCategory] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (file) => {
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('parentCategory', parentCategory);

      const response = await axios.post('http://localhost:8080/admin/category/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Category has been added successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="flex gap-5 my-4">
        <label htmlFor="name">Category Name</label>
        <input
          type="text"
          name="category"
          id="category"
          className="w-[300px] border border-black rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <ImageUpload onImageChange={handleImageChange} />

      <ParentCategorySelector
        catData={catData}
        parentCategory={parentCategory}
        onSelectChange={(e) => setParentCategory(e.target.value)}
      />

      <button type="submit" className="bg-black text-white my-4 p-2 rounded-lg">
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
