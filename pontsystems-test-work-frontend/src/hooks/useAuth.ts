import Cookies from 'js-cookie';
import axios from 'axios';

export const tokenName = 'pontSystems_token';

const useAuth = () => {  

    const login = async (username: string, password: string) => {
        // TODO: check the options of use useAxios but beware the infinite re-renders
        try {
            const response = await axios.post("http://localhost:5000/login", {
              username,
              password,
            });
            const token = response.data.token; 
            Cookies.set(tokenName, token, { secure: false }); 
          } catch (error) {
            console.error('Login failed:', error);
          }

    };

    const logout = () => {
        Cookies.remove(tokenName);
    };

    const isAuthenticated = () => {
        return !!Cookies.get(tokenName);
    }

    return {
        isAuthenticated,
        login,
        logout,
    };
};

export default useAuth;
