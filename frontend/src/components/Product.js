import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const Product = () => {
    const {id} = useParams();
    const quantity = useRef();
    const [product, setProduct] = useState(null);
    const token = localStorage.getItem("token")
    const [msg, setMsg] = useState(null)
    const [showMsg, setShowMsg] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/products", {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            })
            console.log("Response: ", response)
            const result = response && response.data.filter((pro) => pro._id == id)
            console.log("Result: ", result)
            setProduct(result[0]);
            
        }

        fetchData();

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowMsg(true)
        console.log(quantity.current.value, id)
        const token = localStorage.getItem("token")
        console.log(token);
        const response = await axios.post("http://localhost:8080/cart/addItem", {quantity: quantity.current.value, id}, 

            {
                headers: {
                    Authorization: `Bearer ${token}`, // 'Bearer' followed by the token
                },
            }
        )
        console.log(response.data);
        if(response.data){
          setMsg("The item has been added to the cart.")
        }
        else{
          setMsg("An error occured. Could not add item to the cart.")
        }
    }

    if(!product) return null;


  return (
    <div>
      {showMsg && msg && <div className = "text-center flex justify-between bg-red-300 p-4 rounded-lg mt-20 w-[600px] mx-auto relative">
    <p className = "">{msg}</p>
<button onClick = {() => setShowMsg(false)}>X</button>
      </div>}
     
       <div className = "flex justify-around m-5 mt-24">
     
     <div className = "w-80 h-96">
           <img src = {product.image} alt = "Product" className = "w-full h-full object-cover object-center shadow-lg"/>
     </div>
     <div className = " w-1/2 p-3 ">
           <h3 className = "font-bold text-2xl text-gray-600 mb-3">{product.name}</h3>
           <h4 >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, velit iure sint asperiores nam repudiandae magnam ut laborum explicabo, assumenda quae a neque ipsum cupiditate saepe adipisci eum. Vel, aspernatur.</h4>
           <h3 className = "font-bold text-2xl text-gray-600 mb-3 mt-4">${product.price}</h3>
     <div className = "mt-14 flex gap-2">
       <form onSubmit = {handleSubmit}>
           <h4 className = "font-bold text-xl text-gray-600 mb-3">Add the item to the cart</h4>
           <input ref = {quantity} type = "number" className = "p-2 rounded-lg mr-4 border-gray-600 border " placeholder = "Specify Quantity" />
           <button className = "p-2 bg-red-300 rounded-lg">Add To Cart</button>
       </form>
      
     </div>
     </div>
   </div>
    </div>
   
  )
}

export default Product
