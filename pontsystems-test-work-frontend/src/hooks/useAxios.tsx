import { useState, useEffect } from "react";
import axios from "axios";

interface IuseAxiosProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  payLoad?: any;
  fake;
}

function useAxios<T>(url: string, method: "get" | "post" | "put" | "delete") {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
