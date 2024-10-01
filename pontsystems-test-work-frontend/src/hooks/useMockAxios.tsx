import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  addCitizen as addCitizenReducer,
  removeCitizen as removeCitizenReducer,
} from "../store/citizenDataSlice";
import { ICitizenRegistrationData } from "../types";
import { IuseAxiosProps } from "./useAxios";

export function useMockAxios(props: IuseAxiosProps) {
  const { url, method, payLoad } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState<object | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const citizens = useSelector((state: RootState) => state.citizenData.data);

  // NOTE: An another state and asyncThunk creating seems to overkill for this task, but there is another way to do it.
  const getSelectedCitizen = (citizenId: string | undefined) => {
    const selectedCitizen = citizens.find(
      (citizen) => citizen.id === Number(citizenId)
    );
    if (selectedCitizen) {
      setData({ selectedCitizen: selectedCitizen, status: 200 });
    } else {
      setError("No citizen found");
    }
  };

  const addCitizen = (citizen: ICitizenRegistrationData | undefined) => {
    if (citizen) {
      dispatch(addCitizenReducer(citizen));
      setData({ status: 200 });
    } else {
      setError("Missing citizen data");
    }
  };

  const deleteCitizen = (citizenId: string | undefined) => {
    if (citizenId) {
      dispatch(removeCitizenReducer(Number(citizenId)));
      setData({ status: 200 });
    } else {
      setError("Missing citizen id");
    }
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (url === "/getCitizenById" && method === "get") {
        await delay(1000);
        getSelectedCitizen(payLoad?.id);
      } else if (url === "/addCitizen" && method === "post") {
        await delay(1000);
        addCitizen(payLoad?.citizen);
      } else if (url === "/deleteCitizen" && method === "delete") {
        await delay(1000);
        deleteCitizen(payLoad?.id);
      }

      setLoading(false);
    };

    fetchData();
  }, [url, method, payLoad]);

  return { data, loading, error };
}
