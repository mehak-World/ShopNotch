import React from 'react';
import useFetchCategories from '../utils/useFetchCategories';
import useForm from '../utils/useForm';
import FormField from './FormField';

const AddProduct = () => {
  const token = localStorage.getItem('token');
  const categories = useFetchCategories(false);  // Fetch all categories
  const { formRefs, handleSubmit } = useForm('http://localhost:8080/admin/product/add', token);

  return (
    <div className="max-w-[500px] relative mx-auto my-20">
      <h2 className="font-bold text-2xl mb-6">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <FormField label="Product Name" inputRef={formRefs.name} name="product" />
        <FormField label="Add Product Image URL" inputRef={formRefs.image} name="image" />
        
        <div className="my-4 flex gap-6 justify-between">
          <label className="font-bold my-3" htmlFor="parentCategory">Parent Category</label>
          <select
            ref={formRefs.parentCategory}
            className="w-[300px] border border-black rounded-lg p-2"
          >
            <option value="">None</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <FormField label="Product Price" inputRef={formRefs.price} name="price" />
        
        <button type="submit" className="bg-black text-white my-4 p-2 rounded-lg">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
