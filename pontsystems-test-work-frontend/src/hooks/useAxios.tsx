import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import useAuth from "./useAuth";
import { tokenName } from "./useAuth";

const useAxios = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const instance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get(tokenName);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      setError(error.message);
      return Promise.reject(error);
    }
  );

  const fetch = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    payload?: any // The any type in here is OK
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await instance({
        url,
        method,
        data: payload,
      });
      return { data: response.data, error: null };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
        return { data: null, error: error.message };
      }
      setError("An unexpected error occurred");
      return { data: null, error: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return { fetch, loading, error };
};

export default useAxios;
