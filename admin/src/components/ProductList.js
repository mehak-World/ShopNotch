// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="mx-3">
      {products.map((pro) => (
        <div key={pro._id} className="mx-3 p-3 flex justify-around gap-6">
          <img src={pro.image} alt="product" className="w-[100px] h-[100px] object-cover" />
          {pro.name}
          <div className="flex gap-10">
            <button className="p-2 bg-black text-white h-10 rounded-lg">Edit</button>
            <button className="p-2 bg-black text-white h-10 rounded-lg">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
