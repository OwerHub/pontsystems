import { useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { ICitizenFormData } from "../types";
import { Divider } from "antd";
import { useMockAxios } from "../hooks/useMockAxios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface RegisterProps {
  type: "register" | "edit" | "view";
}

function Register(props: RegisterProps) {
  const { type } = props;
  const { id } = useParams<{ id: string }>();
  // const [initialData, setInitialData] = useState<ICitizenFormData | null>(null);
  const [incomingCitizenData, setIncomingCitizenData] =
    useState<ICitizenFormData | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    // getValues,
    formState: { errors },
  } = useForm<ICitizenFormData>({
    defaultValues: {
      creditEligible: false,
    },
  });

  useEffect(() => {
    if (incomingCitizenData) {
      reset({
        title: incomingCitizenData.title || "",
        firstName: incomingCitizenData.firstName || "",
        lastName: incomingCitizenData.lastName || "",
        middleName: incomingCitizenData.middleName || "",
        gender: incomingCitizenData.gender || "",
        maidenName: incomingCitizenData.maidenName || "",
        placeOfBirth: incomingCitizenData.placeOfBirth || "",
        dateOfBirth: incomingCitizenData.dateOfBirth || "",
        nationality: incomingCitizenData.nationality || "",
        taxIdentifier: incomingCitizenData.taxIdentifier || "",
        creditEligible: incomingCitizenData.creditEligible || false,
      });
      // setInitialData(incomingCitizenData);
    }
  }, [incomingCitizenData, reset]);

  const navigate = useNavigate();

  const { loading, error, fetchData } = useMockAxios();

  const gender = useWatch({ control, name: "gender" });
  const nationality = useWatch({ control, name: "nationality" });
  const taxIdentifier = useWatch({ control, name: "taxIdentifier" });

  const validateDate = (value: string | Date) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    const minDate = new Date("1900-01-01");
    if (selectedDate < minDate || selectedDate > currentDate) {
      return "Date must be after 1900 and before today's date.";
    }
    return true;
  };
  const validateTaxIdentifier = (value: string) => {
    if (value.length !== 11) {
      return "The field must be exactly 11 characters long.";
    }
    if (!value.startsWith("8")) {
      return "The field must start with 8.";
    }
    if (!value.includes("2")) {
      return "The field must contain at least one number 2.";
    }
    return true;
  };
  const isCreditEligibleEnabled =
    nationality?.toLowerCase() === "magyar" && taxIdentifier?.length >= 11;

  const onSubmit = async (data: ICitizenFormData) => {
    const formattedDateOfBirth = data.dateOfBirth.toString();
    if (type === "register") {
      try {
        const response = await fetchData("/addCitizen", "post", {
          citizen: { ...data, dateOfBirth: formattedDateOfBirth },
        });
        if (response.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
    if (type === "edit") {
      console.log("%ceditCitizen", "color: green");
      try {
        const response = await fetchData("/editCitizen", "put", {
          citizen: {
            ...data,
            dateOfBirth: formattedDateOfBirth,
            id: Number(id),
          },
        });
        if (response.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleCloseButton = () => {
    // NOTE: The isDirty state isn't usable because the default data was loaded asynchronously.
    // TODO: Implement function what checks the changes (except id, and handle the disabled creditEligible )
    navigate("/dashboard");
  };

  const getCitizenById = async (id: string | undefined) => {
    const response = await fetchData("/getCitizenById", "get", { id });
    console.log("response", response);

    if (response.status === 200 && response?.selectedCitizen) {
      // const dateOfBirthDate = new Date(response?.selectedCitizen.dateOfBirth);

      setIncomingCitizenData({
        ...response?.selectedCitizen,
        /*   dateOfBirth: dateOfBirthDate, */
      });
    }
  };

  useEffect(() => {
    if (type === "edit" || type === "view") {
      getCitizenById(id);
    }
  }, [id, type]);

  // TODO: remove this
  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  // TODO: remove this
  useEffect(() => {
    console.log("incomingCitizenData", incomingCitizenData);
  }, [incomingCitizenData]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", background: "#f0f2" }}
    >
      <h1>Register</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-end",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>Title: </label>
          <input
            style={{ borderColor: errors.title ? "red" : "initial" }}
            {...register("title", {
              required: "This field is required",
            })}
            disabled={type === "view"}
            type="text"
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            style={{ borderColor: errors.firstName ? "red" : "initial" }}
            {...register("firstName", {
              required: "This field is required",
            })}
            disabled={type === "view"}
            type="text"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            style={{ borderColor: errors.lastName ? "red" : "initial" }}
            {...register("lastName", {
              required: "This field is required",
            })}
            disabled={type === "view"}
            type="text"
          />
        </div>
        <div>
          <label>Middle Name:</label>
          <input
            style={{ borderColor: errors.middleName ? "red" : "initial" }}
            {...register("middleName", {
              required: "This field is required",
            })}
            disabled={type === "view"}
            type="text"
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            {...register("gender", {
              required: "This field is required",
            })}
            disabled={type === "view"}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {gender === "female" && (
            <div>
              <label>
                Leánykori név:
                <input
                  {...register("maidenName")}
                  type="text"
                  disabled={type === "view"}
                />
              </label>
            </div>
          )}
        </div>
        <div>
          <label>Place of Birth:</label>
          <input
            style={{ borderColor: errors.placeOfBirth ? "red" : "initial" }}
            {...register("placeOfBirth", {
              required: "This field is required",
            })}
            disabled={type === "view"}
            type="text"
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            style={{ borderColor: errors.dateOfBirth ? "red" : "initial" }}
            {...register("dateOfBirth", {
              required: "This field is required",
              validate: validateDate,
            })}
            disabled={type === "view"}
            type="date"
          />
        </div>
        <div>
          <label>Nationality</label>
          <input
            style={{ borderColor: errors.nationality ? "red" : "initial" }}
            {...register("nationality", {
              required: "This field is required",
            })}
            disabled={type === "view"}
            type="text"
          />
        </div>
        <div>
          <label>Tax Identifier:</label>
          <input
            style={{ borderColor: errors.taxIdentifier ? "red" : "initial" }}
            {...register("taxIdentifier", {
              required: "This field is required",
              validate: validateTaxIdentifier,
            })}
            disabled={type === "view"}
            type="text"
          />
        </div>
        <div>
          <label>Credit Eligible:</label>
          <input
            {...register("creditEligible", {
              required: "This field is required",
              disabled: !isCreditEligibleEnabled,
            })}
            disabled={type === "view"}
            type="checkbox"
          />
        </div>
        <Divider />
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          {type !== "view" && <button type="submit">Save</button>}
          <button type="button" onClick={handleCloseButton}>
            Close
          </button>
        </div>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default Register;
