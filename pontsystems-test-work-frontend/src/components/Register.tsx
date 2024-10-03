import { useParams } from "react-router-dom";
import { ICitizenFormData } from "../types";
import { useMockAxios } from "../hooks/useMockAxios";
import { useEffect, useState } from "react";
import RegisterFormfrom from "./RegisterForm";
interface RegisterProps {
  type: "register" | "edit" | "view";
}

function Register(props: RegisterProps) {
  const { type } = props;
  const { id } = useParams<{ id: string }>();

  const [incomingCitizenData, setIncomingCitizenData] =
    useState<ICitizenFormData | null>(null);

  const { loading, error, fetchData } = useMockAxios();

  const getCitizenById = async (id: string | undefined) => {
    const response = await fetchData("/getCitizenById", "get", { id });
    console.log("response", response);

    if (response.status === 200 && response?.selectedCitizen) {
      setIncomingCitizenData({
        ...response?.selectedCitizen,
      });
    }
  };

  useEffect(() => {
    if (type === "edit" || type === "view") {
      getCitizenById(id);
    }
  }, [id, type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {(incomingCitizenData || type === "register") && (
        <RegisterFormfrom
          type={type}
          incomingCitizenData={incomingCitizenData}
        />
      )}
    </div>
  );
}

export default Register;
