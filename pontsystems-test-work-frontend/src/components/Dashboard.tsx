import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Table, Space, Button } from "antd";
import { deleteIcon, editIcon, viewIcon } from "../assets";
// import { CitizenRegistrationData } from "../store/citizenDataSlice";
import { openModal } from "../store/modalSlice";
import { ICitizenRegistrationData } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchCitizens } from "../store/citizenDataSlice";
import { useEffect } from "react";

function Dashboard() {
  const {
    data: citizens,
    isLoading,
    firstLoading,
  } = useSelector((state: RootState) => state.citizenData);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // NOTE: maybe the fixed colums should be extracted to a constant and imported from a shared file

  const handleDeleteButton = (citizen: ICitizenRegistrationData) => {
    const citizenName =
      citizen.firstName && citizen.lastName
        ? `${citizen.firstName} ${citizen.lastName}`
        : "this citizen";

    const citizenId = citizen.id.toString();

    dispatch(
      openModal({
        modalIdentifier: "deleteCheck",
        type: "dirtyCheck",
        title: "Delete Citizen",
        message: `Are you sure you want to delete ${citizenName} ?`,
        payLoad: { citizenId: citizenId },
      })
    );
  };

  const handleEditButton = (citizen: ICitizenRegistrationData) => {
    navigate(`/edit/${citizen.id}`);
  };

  const handleViewButton = (citizen: ICitizenRegistrationData) => {
    navigate(`/view/${citizen.id}`);
  };

  useEffect(() => {
    if (firstLoading) {
      dispatch(fetchCitizens());
    }
  }, [dispatch]);

  // TODO: extract fix columns to a separate file
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "middleName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Maiden Name",
      dataIndex: "maidenName",
      key: "maidenName",
    },
    {
      title: "Place of Birth",
      dataIndex: "placeOfBirth",
      key: "placeOfBirth",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Tax Identifier",
      dataIndex: "taxIdentifier",
      key: "taxIdentifier",
    },
    {
      title: "Credit Eligible",
      dataIndex: "creditEligible",
      key: "creditEligible",
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: ICitizenRegistrationData) => (
        <Space size="middle">
          <div
            onClick={() => handleViewButton(record)}
            style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
          >
            <img style={{ height: "1rem" }} src={viewIcon} alt="View" />
          </div>
          <div
            onClick={() => handleEditButton(record)}
            style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
          >
            <img style={{ height: "1rem" }} src={editIcon} alt="Edit" />
          </div>
          <div
            style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
            onClick={() => handleDeleteButton(record)}
          >
            <img style={{ height: "1rem" }} src={deleteIcon} alt="Delete" />
          </div>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Dashboard</h1>

      <Button
        type="primary"
        style={{ marginLeft: "auto" }}
        onClick={() => navigate("/register")}
      >
        Add Citizen
      </Button>
      {citizens?.length > 0 ? (
        <Table columns={columns} dataSource={citizens} rowKey="id" />
      ) : (
        <p>No citizens found</p>
      )}
    </div>
  );
}

export default Dashboard;
