import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  addCitizen as addCitizenReducer,
  removeCitizen as removeCitizenReducer,
} from "../store/citizenDataSlice";
import { ICitizenRegistrationData } from "../types";
import { IpayLoad } from "./useAxios";

export function useMockAxios() {
  const dispatch = useDispatch();
  const [data, setData] = useState<object | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const citizens = useSelector((state: RootState) => state.citizenData.data);

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
    let status: 400 | 200 | undefined;
    if (citizen) {
      dispatch(addCitizenReducer(citizen));
      status = 200;
    } else {
      setError("Missing citizen data");
      status = 400;
    }
    return { status };
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

  const fetchData = async (
    url: string,
    method: string,
    payLoad?: IpayLoad
  ): Promise<{ status: 400 | 200 | undefined }> => {
    setLoading(true);
    await delay(1000);
    let status: 400 | 200 | undefined;

    if (url === "/getCitizenById" && method === "get") {
      getSelectedCitizen(payLoad?.id);
    } else if (url === "/addCitizen" && method === "post") {
      console.log("in addCitizen");
      status = addCitizen(payLoad?.citizen).status;
    } else if (url === "/deleteCitizen" && method === "delete") {
      deleteCitizen(payLoad?.id);
      status = 200;
    }
    setLoading(false);
    return { status };
  };

  return { data, loading, error, fetchData };
}
