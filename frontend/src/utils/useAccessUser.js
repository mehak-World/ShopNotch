import React, {useEffect, useState} from "react";
import axios from "axios";


const useAccessUser= () => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
                const response = await axios.get("http://localhost:8080/getUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                console.log(response.data);
                setUser(response.data)
        }

        getUser();
    }, [])

    return user;
}

export default useAccessUser