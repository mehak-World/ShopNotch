import axios from "axios";
import { useEffect, useState } from "react";

const useCategorydata = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(null); // To store the full response data
    const token = localStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/categories", {
                    headers: {
                        Authorization: `Bearer ${token}`, // 'Bearer' followed by the token
                    },
                });
                setData(response.data); // Store the full response data
                const filteredCategories = response.data.filter(
                    (cat) => cat.parentCategory == null && (cat.subcategories.length > 0 || cat.products.length > 0)
                );
                setCategories(filteredCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, [token]);

    return { data, categories }; // Return both data and categories
};

export default useCategorydata;
