import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const useIsLoggedIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let token = localStorage.getItem('token'); 

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromQuery = params.get('token');

        if (tokenFromQuery) {
            // Store token in localStorage
            localStorage.setItem('token', tokenFromQuery);
            token = tokenFromQuery;
            // Remove the token from the URL
            navigate("/browse", { replace: true });
        } else if (!token) {
            // If no token is present, navigate to the login page
            navigate("/");
        }
    }, [location, navigate]);

    return token;
}

export default useIsLoggedIn;
