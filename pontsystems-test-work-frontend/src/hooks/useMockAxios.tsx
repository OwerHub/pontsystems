import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  addCitizen as addCitizenReducer,
  removeCitizen as removeCitizenReducer,
  editCitizen as editCitizenReducer,
} from "../store/citizenDataSlice";
import { ICitizenRegistrationData } from "../types";

export function useMockAxios() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const citizens = useSelector((state: RootState) => state.citizenData.data);

  const getSelectedCitizen = (citizenId: string | undefined) => {
    let status: 400 | 200 | undefined;
    const selectedCitizen = citizens.find(
      (citizen) => citizen.id === Number(citizenId)
    );
    if (selectedCitizen) {
      status = 200;
    } else {
      setError("No citizen found");
      status = 400;
    }
    return { status, selectedCitizen };
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
    let status: 400 | 200 | undefined;
    if (citizenId) {
      dispatch(removeCitizenReducer(Number(citizenId)));
      status = 200;
    } else {
      status = 400;
    }
    return { status };
  };

  const editCitizen = (citizen: ICitizenRegistrationData | undefined) => {
    let status: 400 | 200 | undefined;
    if (citizen) {
      dispatch(editCitizenReducer(citizen));
      status = 200;
    } else {
      status = 400;
    }
    return { status };
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fetchData = async (
    url: string,
    method: string,
    payLoad?: any
  ): Promise<{
    status: 400 | 200 | undefined;
    selectedCitizen?: ICitizenRegistrationData;
  }> => {
    setLoading(true);
    await delay(1000);
    let status: 400 | 200 | undefined;
    let selectedCitizen: ICitizenRegistrationData | undefined;

    if (url === "/getCitizenById" && method === "get") {
      const getResponse = getSelectedCitizen(payLoad?.id);
      status = getResponse.status;
      selectedCitizen = getResponse.selectedCitizen;
    } else if (url === "/addCitizen" && method === "post") {
      status = addCitizen(payLoad?.citizen).status;
    } else if (url === "/deleteCitizen" && method === "delete") {
      status = deleteCitizen(payLoad).status;
    } else if (url === "/editCitizen" && method === "put") {
      status = editCitizen(payLoad?.citizen).status;
    }

    setLoading(false);
    return { status, selectedCitizen };
  };

  return { loading, error, fetchData };
}
