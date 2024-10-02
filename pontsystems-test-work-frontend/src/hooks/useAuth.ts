import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post("http://localhost:5000/login", {
              username,
              password,
            });
            const token = response.data.token; 
            console.log("Login successful:", token);
            Cookies.set('pontSystems_token', token, { secure: false }); 
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
          }

    };

    const logout = () => {
        Cookies.remove('pontSystems_token');
        setIsAuthenticated(false);
    };

    console.log('isAuthenticated:', isAuthenticated);

    return {
        isAuthenticated,
        login,
        logout,
    };
};

export default useAuth;
