// src/components/SubcategoryList.js
import React from 'react';
import ProductList from './ProductList';

const SubcategoryList = ({ subcategories }) => {
  return (
    <div className="mx-3">
      {subcategories.map((subcat) => (
        <div key={subcat._id}>
          <h3 className="text-xl">{subcat.name}</h3>
          {subcat.products.length > 0 && <ProductList products={subcat.products} />}
        </div>
      ))}
    </div>
  );
};

export default SubcategoryList;
