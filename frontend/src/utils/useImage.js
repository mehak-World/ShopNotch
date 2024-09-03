import {useEffect} from 'react'
import axios from 'axios'

const useImage = (setImageUrl) => {

    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getUserImg', {
                    
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    console.log(response.data)
                setImageUrl(response.data.imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
    
        fetchImage()
        
      },[])
}

export default useImage;
