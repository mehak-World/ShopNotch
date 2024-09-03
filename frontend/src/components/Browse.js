import React, { useState, useEffect } from 'react';
import useIsLoggedIn from '../utils/useIsLoggedIn';
import Carousel from './Carousel';
import useCategorydata from '../utils/useCategorydata';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popular from './Popular';

const Browse = () => {
  useIsLoggedIn();
  const { data, categories } = useCategorydata();

  // Utility function to get the image URL
  const getImageUrl = (imagePath) => {
    const backendBaseUrl = "http://localhost:8080/public/images/uploads/"; // Base URL for images hosted on the backend
  
    // If imagePath starts with "http" or "https", it's an external URL, so use it as is
    if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
      return imagePath;
    }
  
    // If imagePath starts with "data:image", it's a base64 encoded image, so use it as is
    if (imagePath.startsWith('data:image')) {
      return imagePath;
    }
  
    // Otherwise, assume it's a filename for an image stored on the backend
    return backendBaseUrl + imagePath;
  };
  

  return (
    <div>
      <div className="bg-gray-100">
        <Carousel />
        <div className="m-5">
          <h3 className="text-3xl font-bold mb-3">Explore Our Items</h3>
          <div className="flex gap-3 flex-wrap my-5">
            {categories.map((cat) => {
              const id = cat._id;
              const imageUrl = getImageUrl(cat.image); // Use utility function here

              return (
                <Link key={id} to={`/browse/${id}/items`}>
                  <div className="bg-red-100 my-2 w-72 h-72 shadow-lg mx-3 cursor-pointer">
                    <img src={imageUrl} className="w-full h-full object-cover" alt={cat.name} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <h3 className="font-bold my-5 mx-3 text-2xl">Our Popular Products</h3>
      <Popular />
    </div>
  );
};

export default Browse;
