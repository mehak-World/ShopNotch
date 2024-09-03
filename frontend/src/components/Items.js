import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import useCategorydata from '../utils/useCategorydata';
import { Link } from 'react-router-dom';

const Items = () => {
    const {id} = useParams();
    const [cat, setCat] = useState(null);

    const {data, categories} = useCategorydata()
    console.log(data);
    console.log(categories);

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
    
    

    useEffect(() => {
       
        const filtered = data?.filter((cat) => cat._id == id)
        console.log(filtered);
        filtered &&  setCat(filtered[0])
    }, [categories, id])

    if(!cat) return null;

  return (
    <div className = "m-5 p-2">
      <h2 className = "font-bold text-3xl text-gray-600 my-3">{cat.name}</h2>
      <h4 className = "text-2xl text-gray-700 my-4">Explore all the items</h4>
      <div>
        {cat.subcategories.length > 0  ?  
        <div className = "flex gap-4">
            {cat.subcategories.map((subcat) => {
              const imageUrl = getImageUrl(subcat.image);
              return (
                
                <Link to = {"/browse/" + subcat._id + "/items"} >
                     <div className = "bg-red-100 my-2  max-w-72 shadow-lg  cursor-pointer">
                    <img src = {imageUrl} alt = "sub category" className = "w-full h-full object-cover"/>
                   </div>
                </Link>
              )
            })}
  
     
        </div>: <div className = "flex gap-4">
                {cat.products.map((product) => 
                <Link to = {"/browse/" + product._id} >
                    <div className = "bg-red-100 my-2 w-72  shadow-lg  cursor-pointer">
                    <img src = {product.image} alt = "Product" className = "w-full h-full object-cover"/>
                </div>
                </Link>
                
                )}
            </div>}
      </div>
    </div>
  )
}

export default Items
