import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Popular = () => {
    const [popular, setPopular] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/products/popular")
            console.log("Popular data", response.data[0].products)
            setPopular(response.data[0].products)
        }

        fetchData();
    }, [])

  return (
    <div className = "flex gap-2 overflow-x-auto">
      {popular.map((product) => {
        return (
            <Link to = {"/browse/" + product._id} >
                 <div className = "bg-red-100 my-2 w-60  h-60 shadow-lg mx-3 cursor-pointer flex gap-2">
                <img src = {product.image} className = "w-full h-full object-cover"></img>
            </div>
            </Link>
        )
      })}
    </div>
  )
}

export default Popular
