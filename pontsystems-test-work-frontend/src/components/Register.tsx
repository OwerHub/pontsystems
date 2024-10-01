import { useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { ICitizenFormData } from "../types";
import { Divider } from "antd";

interface RegisterProps {
  type: "register" | "edit" | "view";
}

function Register(props: RegisterProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICitizenFormData>();

  const gender = useWatch({ control, name: "gender" });
  const nationality = useWatch({ control, name: "nationality" });
  const taxIdentifier = useWatch({ control, name: "taxIdentifier" });

  const validateDate = (value: Date) => {
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

  const onSubmit = (data: ICitizenFormData) => {
    console.log("submitData", data);
  };

  console.log("error", errors);

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
            type="text"
          />
        </div>
        <div>
          <label>
            First Name: {register("firstName").required && <span>sds</span>}
          </label>
          <input
            style={{ borderColor: errors.firstName ? "red" : "initial" }}
            {...register("firstName", {
              required: "This field is required",
            })}
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
            type="text"
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            {...register("gender", {
              required: "This field is required",
            })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {gender === "female" && (
            <div>
              <label>
                Leánykori név:
                <input type="text" {...register("maidenName")} />
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
            type="date"
            /*      min="1900-01-01"
            max={new Date().toISOString().split("T")[0]} */
          />
        </div>
        <div>
          <label>Nationality</label>
          <input
            style={{ borderColor: errors.nationality ? "red" : "initial" }}
            {...register("nationality", {
              required: "This field is required",
            })}
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
            type="checkbox"
          />
        </div>
        <Divider />
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => console.log("Close button clicked")}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
