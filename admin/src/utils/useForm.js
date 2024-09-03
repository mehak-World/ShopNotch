import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useForm = (url, token, onSuccess) => {
  const formRefs = {
    name: useRef(null),
    image: useRef(null),
    price: useRef(null),
    parentCategory: useRef(null),
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, {
        name: formRefs.name.current.value,
        image: formRefs.image.current.value,
        price: formRefs.price.current.value,
        parentCategory: formRefs.parentCategory.current.value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert("The product has been added");
        onSuccess && onSuccess();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return { formRefs, handleSubmit };
};

export default useForm;
