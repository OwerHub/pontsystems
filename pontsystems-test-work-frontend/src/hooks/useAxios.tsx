import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import {
  addCitizen as addCitizenReducer,
  removeCitizen as removeCitizenReducer,
} from "../store/citizenDataSlice";
import { ICitizenRegistrationData } from "../types";

export interface IpayLoad {
  id?: string;
  citizen?: ICitizenRegistrationData;
}

export interface IuseAxiosProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  payLoad?: IpayLoad;
}

export function useAxios(props: IuseAxiosProps) {
  const { url, method, payLoad } = props;

  const [data, setData] = useState<object | null>(null);
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
