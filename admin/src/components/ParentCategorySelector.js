import React from 'react';

const ParentCategorySelector = ({ catData, parentCategory, onSelectChange }) => (
  <div className="my-4 flex gap-6">
    <label className="font-bold my-3" htmlFor="parentCategory">Parent Category</label>
    <select value={parentCategory} onChange={onSelectChange}>
      <option value="">None</option>
      {catData.map((cat) => (
        <option key={cat._id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  </div>
);

export default ParentCategorySelector;
