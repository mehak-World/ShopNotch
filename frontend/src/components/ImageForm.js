import React from 'react'

const ImageForm = ({imageUrl, image, previewImage}) => {
  return (
    <div>
      <div className="flex justify-between align-middle mb-4">
          <label className="font-bold mt-2">Upload Image</label>
          <div>
            <img
              id="imagePreview"
              src= {imageUrl != null ? "http://localhost:8080" + imageUrl: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
              alt="Placeholder Image"
              className="mb-2 object-cover w-[100px]"
            />
            <input
              type="file"
              ref={image}
              name="image"
              id="imageInput"
              onChange={(event) => previewImage(event)}
            />
          </div>
        </div>
    </div>
  )
}

export default ImageForm


