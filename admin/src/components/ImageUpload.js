import React from 'react';

const ImageUpload = ({ onImageChange }) => {
  const previewImage = (event) => {
    const reader = new FileReader();
    reader.onload = function () {
      const output = document.getElementById('imagePreview');
      output.src = reader.result;
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    onImageChange(event.target.files[0]);
  };

  return (
    <div>
      <label className="font-bold my-3" htmlFor="imageInput">Upload Image</label>
      <img
        id="imagePreview"
        src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
        alt="Placeholder"
        className="my-4 object-cover w-[100px]"
      />
      <input type="file" name="image" id="imageInput" onChange={previewImage} />
    </div>
  );
};

export default ImageUpload;
