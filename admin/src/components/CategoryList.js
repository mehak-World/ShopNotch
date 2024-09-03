// src/components/CategoryList.js
import React from 'react';
import SubcategoryList from './SubcategoryList';
import ProductList from './ProductList';

const CategoryList = ({ categories }) => {
  return categories.map((cat) => (
    <div key={cat._id} className="mb-20">
      <h2 className="font-bold text-2xl my-2">{cat.name}</h2>
      <div>
        {cat.subcategories.length > 0 && <SubcategoryList subcategories={cat.subcategories} />}
        {cat.products.length > 0 && <ProductList products={cat.products} />}
      </div>
      <hr className="h-7"></hr>
    </div>
  ));
};

export default CategoryList;
